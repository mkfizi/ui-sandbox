# Changelog

All notable changes to this project will be documented chronologically ordered
in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and versioning adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Types of changes:

-   `Added` for new features.
-   `Changed` for changes in existing functionality.
-   `Deprecated` for soon-to-be removed features.
-   `Removed` for now removed features.
-   `Fixed` for any bug fixes.
-   `Security` in case of vulnerabilities.

## [Unreleased]

Put unreleased changes here.

## [1.0.0] - 2024-05-03

### Added.

-   Vite compiler.
-   AlpineJS, PostCSS and Autoprefixer packages.
-   Prettier formatting.
-   System theme toggle.
-   Subtitle element.
-   Inactive and active link elements.
-   Outline button element.

### Changed

-   Source files into `src` directory.
-   Aassets into `/src/assets` directory.
-   `app.*` to `index.*`.
-   Rewrite Javascript codebase into AlpineJS.
-   Dark mode background to `bg-neutral-950`.
-   Icons sizing to `w-5 h-5`.
-   Dark mode toggle to dropdown toggle.
-   Typography default colour to `*-neutral-800 dark:*-neutral-200`.
-   Typography default sizing to `text-sm`.
-   Headings element size.
-   Borders and divider line colour to `*-neutral-200 dark:*-neutral-800`.
-   Badge element style.
-   Primary and secondary button elements style.
-   Table element style.
-   Form elements style.
-   Revamp 404 page.

### Removed

-   Heading H5 and H6 elements.
-   Blockquote element.
-   Link as button elements.
-   Searchbar input element.
-   App name from footer.

## [0.4.1] - 2023-12-01

### Removed

-   Footnote typography.
-   Link `block` display class.
-   Internal and external link.

## [0.4.0] - 2023-11-11

### Added

-   Table element.
-   Range slider input.

### Changed

-   Change link colours to `neutral-500` for light mode.

## [0.3.1] - 2023-10-26

### Changed

-   Remove from Tailstart.
-   Revise metadata.
-   Content max width to `sm`.
-   Remove `404.html` page dependencies.

## [0.3.0] - 2023-08-21

### Added

-   Tailstart metadata.
-   Tailstart logo to navbar.

### Changed

-   Logo to Tailstart logo.
-   Reduce button x-axis padding size.
-   Revise content padding size.
-   Revise footer appearance.

## [0.2.1] - 2023-08-07

### Changed

-   Search bar appearance.

## [0.2.0] - 2023-07-16

### Added

-   Internal and external link styles.
-   Input search bar.

### Changed

-   Checkbox and radio to follow default browser appearance which changed accent colour.
-   Adapt `app.js` to use IIFE for more conventional standards.
-   Rewrite `app` object for more structured content.

### Removed

-   TailwindCSS Forms plugin.
-   Input date.
-   Remove unnecessary toogle all transition function since there's no transition classes

## [0.1.1] - 2023-07-02

### Added

-   All headings `<h1>` to `<h6>` styles.
-   Forms styles.

### Changed

-   Rewrite layout.
-   Rewrite `README.md`.

## [0.1.0] - 2023-06-14

### Added

-   First release.
