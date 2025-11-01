import { createHighlighter } from 'shiki';
import {
    transformerNotationDiff,
    transformerNotationHighlight,
    transformerNotationWordHighlight,
    transformerNotationFocus,
    transformerNotationErrorLevel,
} from '@shikijs/transformers'

// Configuration
const config: object = {
    theme: { light: 'github-light', dark: 'github-dark' },
    langs: ['js', 'ts', 'json', 'html', 'css', 'bash', 'markdown'],
};

// Utility functions
const utility: object = {
    // Get language from data-lang attribute
    getLanguageFromAttributes(allAttributes: string): string {
        const langMatch = allAttributes.match(/data-lang=["']?([\w-]+)["']?/);
        return langMatch ? langMatch[1] : 'markdown';
    },
    // Get title from data-title attribute
    getTitleFromAttributes(allAttributes: string): string | null {
        const titleMatch = allAttributes.match(/data-title=["']([^"']*)["']/);
        return titleMatch ? titleMatch[1] : null;
    },  
    // Get copy option from data-copy attribute
    getCopyFromAttributes(allAttributes: string): boolean {
        const copyMatch = allAttributes.match(/data-copy=["']?(\w+)["']?/);
        return copyMatch ? copyMatch[1] === 'true' : true;
    },
    // Clean code indentation
    cleanCodeIndentation(code: string): string {
        code = code.replace(/^\s*\n/, '').replace(/\n\s*$/, '');
        const lines = code.split('\n');
        const indent = lines.filter(line => line.trim()).length > 0
            ? Math.min(...lines.filter(line => line.trim()).map(line => line.match(/^(\s*)/)![0].length))
            : 0;
        return code.split('\n').map(line => line.slice(indent)).join('\n');
    },
    // Remove Shiki background styles
    removeShikiBackgroundStyles(html: string): string {
        return html.replace(/background-color:[^;]*;?/g, '')
                   .replace(/--shiki-light-bg:[^;]*;?/g, '')
                   .replace(/--shiki-dark-bg:[^;]*;?/g, '');
    },
    // Wrap code block with container including title and copy button
    wrapWithCodeWrapper(html: string, title: string | null, copy: boolean, code: string): string {
        const copyButtonHtml = `
            <button type="button"
                x-data="{ isCopied: false }"
                @click="isCopied = true; navigator.clipboard.writeText($el.dataset.code).then(() => { setTimeout(() => isCopied = false, 2000); });"
                aria-label="Copy code."
                data-code="${code.replace(/"/g, '&quot;').replace(/'/g, '&#39;')}"
            >
                <svg x-show="!isCopied" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"/><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/></svg>
                <svg x-show="isCopied" x-cloak xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"/><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/><path d="M9 14l2 2l4 -4"/></svg>
            </button>
        `;
        
        return `<div class="code-wrapper">
            <div class="code-title-wrapper">
                <p>${title}</p>
                ${copy ? copyButtonHtml : ''}
            </div>
            ${html}
        </div>`;
    }
};

// Shiki transformers configuration
const transformers = [
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerNotationWordHighlight(),
    transformerNotationFocus(),
    transformerNotationErrorLevel(),
];


let highlighter: any = null;

// Initialize Shiki highlighter
async function getHighlighter() {
    if (!highlighter) {
        highlighter = await createHighlighter({
            themes: [config.theme.light, config.theme.dark],
            langs: config.langs
        });
    }
    return highlighter;
}

export default function vitePluginShiki() {
    return {
        name: 'vite-plugin-shiki',
        async transformIndexHtml(html) {
            const highlighterInstance = await getHighlighter();
            
            const transformedHtml = html.replace(
                /<pre([^>]*?)data-shiki([^>]*?)>([\s\S]*?)<\/pre>/gs,
                (match, before, after, code) => {
                    const allAttributes = before + after;
                    const lang = utility.getLanguageFromAttributes(allAttributes);
                    const title = utility.getTitleFromAttributes(allAttributes);
                    const copy = utility.getCopyFromAttributes(allAttributes);

                    code = utility.cleanCodeIndentation(code);
                    
                    // Generate highlighted HTML with dual theme support
                    let highlightedHtml = highlighterInstance.codeToHtml(code, { 
                        lang, 
                        themes: config.theme,
                        transformers: transformers
                    });

                    highlightedHtml = utility.removeShikiBackgroundStyles(highlightedHtml);
                    highlightedHtml = utility.wrapWithCodeWrapper(highlightedHtml, title ?? lang, copy, code);
                   
                    return highlightedHtml;
                }
            );
            
            return transformedHtml;
        },
        
        // Dispose of the highlighter when the build is done
        buildEnd() {
            if (highlighter) {
                highlighter.dispose();
                highlighter = null;
            }
        }
    }
}