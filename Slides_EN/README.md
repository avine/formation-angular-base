# Write or edit slides

## Principles

The framework used is [Reveal.js](https://github.com/hakimel/reveal.js).

The Reveal framework, customized for Zenika training, is imported and installed in training via `npm`.

Only the content of the slides are therefore in this directory.

There are 2 types of files. On the one hand, `slides.json` allows you to specify which chapters to include. On the other hand, chapters are written in markdown files.

## Markdown Inclusion

To change the list of loaded files, edit `slides.json`. This file contains a list of the paths of the markdown files to include. The path must be relative to the `slides.json` file, itself to be located at the root of the` Slides` directory.

Example:

```Json
[
  "Premier_fichier.md"
  "Chapter2/second_fichier.md"
]
```

## Content

### Drafting rules

- The content is exploded in the markdown files, one per chapter of the training.
- The training begins with a zero chapter, which contains at least a title page with the title of the training, a page that presents the training plan, and an invitation page for questions. It is possible to add reminders about schedules and other practical information.
- All chapters start with a title page with the title of the chapter and a page that shows the training plan. The current game highlighted.
- All chapters end with a page asking questions, then possibly a page that announces a TP.

### Markdown

- The [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown) is supported
- Each slide must be separated by 3 white lines.

#### Special pages

Some recurring pages of the formations are realized thanks to classes css.

##### Title pages

The title pages are composed of a first level title of a Zenika background.

```Markdown
# Title of the chapter

<!-- .slide: class="page-title" -->
```

##### Question pages

Questions pages have no title.

```Markdown
<!-- .slide: class="page-questions" -->
```

##### TP Pages

The pages of TP have no title, just use the class corresponding to the TP number (from 1 to 15).

```Markdown
<!-- .slide: class="page-tp1" -->
```

#### Plan Pages

- Emphasis on the current game in the plan slides is a double emphasis: `** Current game **`.
- The links between slides being possible, it is interesting to put on the slides of plan. An inter-slides link is in the format `#/<chapter>/<slide>` knowing that chapters and slides are numbered from scratch, and that the slide number is optional (zero by default).

```Markdown
## Plan

- [Part 1](#/1)
- ** [Part 2](#/2) **
- [Part 3](#/3)
```

#### Standard pages

- Standard slides start with a second level title.
- The important words are to emphasize with simple emphasis: `* important word *`.

#### Code

- For inline code, use the standard Markdown syntax, and for code blocks, use the GFM blocks with language specification.

<Pre> <code>
```Javascript
function (arg) {return 'of javascript in color!'; }
```
</ Code> </ pre>

- There is no return to the automatic line in the blocks of code, so check that the lines fit well in the width of the slide.
- If a line of code begins with a continuous sequence of spaces that are too long, the line is put on the line. It is therefore necessary to indent with 2 spaces only.

#### Images

- For images, write classic HTML. The size can be changed via the `width` attribute, and the position by changing the margins. The `.with-border` class activates a thin black border around the image.

```HTML
<img
  src = "resources/image.png"
  alt = "An image"
  width = "90%"
  style = "margin-top: 10%"
  class="with-border" />
```

- To add a caption to an image, you can use the HTML5 `figure` and` figcaption` elements.

```HTML
<Figure>
    <img
      src = "resources/image.png"
      alt = "An image" />
    <figcaption> A superb representation of something </ figcaption>
</ Figure>
```

- The image path must be relative to the root of the Slides directory.

#### Fragments

It can be said that slide elements should be revealed only as the trainer presses the button. You have to use the `fragment` class.

```Markdown
- item that does not appear right away <!-- .element: class="fragment" -->
```

#### Advanced Features

If need be, one can add HTML attributes to the current slide or to an element thanks to the syntaxes `<!-- .slide: ... -->` and `<!-- .element: ... - > `. This can be useful to give a particular style to an element, for example to position it.

#### Miscellaneous

Other examples can be found directly in the model slides.

# Consult the slides

## Launch

- Go to the root of the training
- Start the server with `grunt` or` grunt displaySlides` in a console
- The slides are launched directly on your favorite browser (works well in Chrome, should work also under FF)
- If the browser does not open, go to `http: // localhost: 8000`
- You will arrive on the chapter zero, slide one, that is to say the front page of the formation
- If port 8000 is a problem on your machine, you can choose the port by adding the option `--port = 9999`

## Launch with Docker

- Go to the root of the training
- Start the server with docker `docker run -it $ PWD:/data --net = host --rm dockerfile/nodejs - bower - grunt grunt`
- Go to `http: // localhost: 8000`

If there is a problem starting the server, you can restore a normal situation by copying the contents of the .md file to the html file, adding a `<script>` tag, as follows:

Replace
```HTML
<!-- Slides will be inserted here -->
```

By
```HTML
<section
  data-markdown = "00_agenda.md"
  data-vertical = "^ \ r? \ n \ r? \ n \ r? \ n"
  data-notes = "^ Notes:">
  <script type = "text/template">
    # Title of the training

    ...
  </ Script>
</ Section>
```
* Note: * Changes in chapter files (`* .md`),` slides.json`, and resources are taken into account if the server was started with `grunt`.

## Navigation

- Space allows to go to the next slide
- Up and down arrows to navigate within the chapter
- Left and right arrows to navigate between chapters
- Plan slides are made of links to jump directly to the different chapters
- The small arrow on the bottom left returns to the slide Master plan (chapter zero, slide two)
- The previous and next functions of the browser works normally

## Keyboard shortcuts

- `space` goes to the next slide
- `up/down/left/right` navigate through the slides
- `o gives access to a view with hindsight on the slides
- `s` activates the presenter mode: a new window opens with slide in progress, next slide, elapsed time, notes
- "b" "turn off" the presentation, so that the participants focus on the presenter
- `alt` +` clic` zooms in/out on part of the slide

## Export to PDF

### Manually

- Open slides in Chrome
- Add `? Print-pdf` at the end of the URL (` http: // localhost: 8000? Print-pdf`)
- P-control to bring print options
- To select :
  - Destination: Save as PDF
  - Layout: Landscape
  - Margins: None
- Save the PDF

### Automatically

`grunt generateSlidesPDF`

- It is useless to launch the server in advance, it is done automatically
- It is possible to use a different port thanks to `--port = 9999`

: boom: Attention rendering automatically generated pdf is bad at the moment, so it is more than preferable to use the manual method
