# Workbook

## General explanations

To write the notebook of lab, you have 2 solutions:

- write the whole notebook in the file `Cahier.md`.
- make several Markdown files and list them in the `parts.json` file

### Page break

To make a page break, place the following line:

```html
<div class="pb"></div>
```

## PDF generation

To generate the PDF workbook, type the following command:
```
grunt generateCahierExercice
```

It is possible to generate both the workbook and the slides in PDF format with the `grunt pdf` command

## Assets

Put assets is possible with a relative link to the `.md` file

Here is a sample image:

```markdown
![Node.js](ressources/logo-zenika.jpg)
```
