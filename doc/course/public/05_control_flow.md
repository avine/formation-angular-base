# Control flow

<!-- .slide: class="page-title" -->

<!-- separator-vertical -->

## Table of Contents

<div class="columns">
<div class="column-50">

- [Getting started](#/1)
- [Workspace](#/2)
- [Technical prerequisites](#/3)
- [Components](#/4)
- [Unit testing](#/5)
- **Control flow**
- [Directives](#/7)

</div>
<div class="column-50">

- [Signals](#/8)
- [Dependency injection](#/9)
- [Pipes](#/10)
- [Http client](#/11)
- [Routing](#/12)
- [Forms](#/13)
- [Appendix](#/14)

</div>
</div>

<!-- separator-vertical -->

## Control flow

- Angular templates support control flow blocks that let you **conditionally show, hide, and repeat elements**

- The most common control flows are

  - `@if`
  - `@for`
  - `@switch`

😉 *Another control flow is `@defer` block, but its study goes beyond the scope of this course*

<!-- separator-vertical -->

## Control flow - @if 1/2

- Conditionally display content with `@if {}`, `@else if {}` and `@else {}`

```html
@if (todos === undefined) {

  <p>Please wait, your todo list is being loaded...</p>

} @else if (todos.length === 0) {

  <p>Your todo list is empty.</p>

} @else {

  <p>You have {{ todos.length }} todos in your list.</p>
}
```

*In this example, we assume that the property `todos: Todo[]` is defined on the component class*

<!-- separator-vertical -->

## Control flow - @if 2/2

- The `@if` conditional supports saving the result of the conditional expression into a variable for reuse inside of the block


```html
@if (todos === undefined) {

  <p>Please wait, your todo list is being loaded...</p>

} @else if (todos.length; as todosLength) {

  <p>You have {{ todosLength }} todos in your list.</p>
}
```

<!-- separator-vertical -->

## Control flow - @for 1/3

- Repeat content with the `@for` block

```html
<ul>
  @for (todo of todos; track todo.id) {

    <li>{{ todo.title }}</li>

  }
</ul>
```

- The `track` expression allows Angular to maintain a relationship between your data and the DOM nodes on the page

- This allows Angular to optimize performance by executing the minimum necessary DOM operations when the data changes

<!-- separator-vertical -->

## Control flow - @for 2/3

- Inside `@for` blocks, several implicit variables are always available...

```html
<ul>
  @for (todo of todos; track todo.id) {
    <li>{{ $index + 1 }}/{{ $count }} {{ todo.title }}</li>
  }
</ul>
```

- ...but can be aliased if needed, using `let` syntax

```html
<ul>
  @for (todo of todos; track todo.id; let idx = $index, cnt = $count) {
    <li>{{ idx + 1 }}/{{ cnt }} {{ todo.title }}</li>
  }
</ul>
```

- Here's the list of the implicit variables which are self-explanatory

  - `$count`, `$index`, `$first`, `$last`, `$even`, `$odd` 

<!-- separator-vertical -->

## Control flow - @for 3/3

- Providing a fallback for `@for` blocks with the `@empty` block

```html
<ul>
  @for (todo of todos; track todo.id; let index = $index, count = $count) {

    <li>{{ index + 1 }}/{{ count }} {{ todo.title }}</li>

  } @empty {

    <li>Your todo list is empty.</li>
  }
</ul>
```

<!-- separator-vertical -->

## Control flow - @switch

- Conditionally display content with the `@switch` block

```html
@switch (todos.length) {
  @case (0) {
    <p>Your todo list is empty.</p>
  }

  @case (1) {
    <p>You have one todo in your list.</p>
  }

  @default {
    <p>You have {{ todos.length }} todos in your list.</p>
  }
}
```

<!-- separator-vertical -->

## Control flow - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->

<!-- separator-vertical -->

## Control flow - Lab 5
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->
