import { createHighlighter } from 'shiki';

let highlighterPromise: Promise<any> | null = null;
let lightTheme = 'github-light';
let darkTheme = 'github-dark';

export default function vitePluginShiki() {
    return {
        name: 'vite-plugin-shiki',
        async transformIndexHtml(html) {
            if (!highlighterPromise) {
                highlighterPromise = createHighlighter({ 
                    themes: [lightTheme, darkTheme], 
                    langs: ['javascript', 'typescript', 'css', 'html', 'json'] 
                });
            }
            
            const highlighter = await highlighterPromise;
            
            const transformedHtml = html.replace(
                /<pre([^>]*?)data-shiki([^>]*?)>([\s\S]*?)<\/pre>/gs,
                (match, before, after, code) => {
                    // Get language from data-lang attribute
                    const allAttributes = before + after;
                    const langMatch = allAttributes.match(/data-lang=["']?([\w-]+)["']?/);
                    const lang = langMatch ? langMatch[1] : 'markdown';

                    // Extract existing classes
                    const classMatch = allAttributes.match(/class=["']([^"']*)["']/);
                    const existingClasses = classMatch ? classMatch[1] : '';

                    // Clean code indentation
                    code = code.replace(/^\s*\n/, '').replace(/\n\s*$/, '');
                    const lines = code.split('\n');
                    const indent = lines.filter(line => line.trim()).length > 0
                        ? Math.min(...lines.filter(line => line.trim()).map(line => line.match(/^(\s*)/)![0].length))
                        : 0;
                    code = lines.map(line => line.slice(indent)).join('\n');
                    
                    // Generate highlighted HTML with dual theme support
                    let highlightedHtml = highlighter.codeToHtml(code, { 
                        lang, 
                        themes: {
                            light: lightTheme,
                            dark: darkTheme
                        }
                    });

                    // Merge existing classes with Shiki's classes
                    if (existingClasses) {
                        highlightedHtml = highlightedHtml.replace(
                            /<pre([^>]*)class=["']([^"']*)["']/,
                            `<pre$1class="${existingClasses} $2"`
                        );
                    }
                    
                    return highlightedHtml;
                }
            );
            
            return transformedHtml;
        }
    }
}