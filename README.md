# Photo Carousel Site

A minimal static photo carousel for GitHub Pages.

## Add your photos

1. Put your image files in the `images` folder.
2. Open `script.js`.
3. Replace the sample entries in the `photos` array with your own filenames, captions, and alt text.

Example:

```js
{
  src: "images/my-photo.jpg",
  caption: "Optional caption here.",
  alt: "Brief description of the image"
}
```

Use an empty caption if you do not want text beneath the photo:

```js
caption: ""
```

## Publish with GitHub Pages

1. Create a GitHub repository.
2. Upload these files to the root of the repository.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose your main branch and `/ (root)`, then save.

Your site will then be available through GitHub Pages.
