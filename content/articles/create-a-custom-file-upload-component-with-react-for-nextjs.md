---
title: Create a Custom file upload component with React for Next.js
description: Learn how to build a custom file upload component with drag-and-drop functionality in React for your Next.js applications.
tags: [React, Next.js, file upload, drag-and-drop, custom component]
---

## Introduction

In this tutorial, we will create a custom file upload component with drag-and-drop functionality in React. The component will allow users to upload image files (PNG and JPEG) either by selecting them through a file input or by dragging and dropping them onto the component.

## Prerequisites

Before we start, make sure you have the following installed:

- Node.js and npm (Node Package Manager)
- A code editor of your choice (e.g., Visual Studio Code)
- A React or Next.js project already set up, [here's how you can start a new React project](https://react.dev/learn/start-a-new-react-project)

## Step 1: Create the CustomDragDrop Component

Now, let's create the custom file upload component named `CustomDragDrop.tsx` in the `src/components` folder.

```jsx
// src/components/CustomDragDrop.tsx

import Image from "next/image";
import { DragEvent, FormEvent, useEffect, useRef, useState } from "react";
import add_photo_alternate_icon from "../../assets/icons/add_photo_alternate.svg";

const CustomDragDrop = ({
  updateFileUpload,
  removeFile,
}: {
  updateFileUpload: (file: File) => void;
  removeFile?: boolean;
}) => {
  // Component logic will go here...
};

export default CustomDragDrop;
```

Here, we have two props:

- `updateFileUpload`: A function that will be called when a file is selected or dropped. It takes a `File` object as a parameter and returns `void`.
- `removeFile`: An optional boolean prop that indicates whether the file input should be cleared or not. It defaults to `false`.

## Step 2: Implement the CustomDragDrop Component

Now, let's implement the CustomDragDrop component step-by-step:

### Step 2.1: Declare state, refs and functions

Here, we'll add the core of the component functionality

```jsx
import React from "react";

const CustomDragDrop = ({
  updateFileUpload,
  removeFile,
}: {
  updateFileUpload: (file: File) => void;
  removeFile?: boolean;
}) => {
  // file input ref
  const FileInput = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLInputElement>;

  // drag state
  const [dragActive, setDragActive] = useState(false);

  // handle drag events
  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragover" || e.type === "dragenter") {
      setDragActive(true);
    } else if (e.type === "dragleave" || e.type === "drop") {
      setDragActive(false);
    }
  };

  // handle drop event
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      updateFileUpload(e.dataTransfer.files[0]);
      setDragActive(false);
    }
  };

  // handle change event
  const handleChange = (
    e: FormEvent<HTMLInputElement> & { target: HTMLInputElement }
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files && e.target.files.length > 0) {
      updateFileUpload(e.target.files[0]);
    }
  };

  // remove file
  useEffect(() => {
    if (removeFile) {
      FileInput.current.value = "";
    }
  }, [removeFile]);

  return (
    // JSX for custom file upload field...
  );
};

export default CustomDragDrop;
```

- We start by using the `useRef` hook to create a reference called `FileInput` to the file input element. This reference will be used later to clear the file input if needed.
- Next, the `useState` hook is used to define the `dragActive` state variable, which keeps track of whether a drag-and-drop event is active or not. It is initialized to `false`.
- The component defines three event handlers:
  - `handleDrag`: This function handles drag events (`dragover`, `dragenter`, `dragleave`, `drop`) and toggles the `dragActive` state accordingly.
  - `handleDrop`: This function handles the drop event and extracts the first file from the `dataTransfer.files` object. It then calls the `updateFileUpload` function with the dropped file as a parameter and sets `dragActive` to `false`.
  - `handleChange`: This function handles the change event when a file is selected using the file input. It calls the `updateFileUpload` function with the selected file as a parameter.
- The `useEffect` hook is used to monitor changes in the `removeFile` prop. If `removeFile` is `true`, it means the file input should be cleared, so we set its value to an empty string.

### Step 2.2: Implement the JSX

Now, let's complete the JSX for the custom file upload field:

```jsx
const CustomDragDrop = ({
  updateFileUpload,
  removeFile,
}: {
  updateFileUpload: (file: File) => void;
  removeFile?: boolean;
}) => {
  // ...Previous code...

  return (
    <div onDragEnter={handleDrag} className="custom-drag-drop form-control">
      <input
        ref={FileInput}
        type="file"
        name="file"
        id="file"
        onChange={handleChange}
        accept="image/jpeg, image/jpg, image/png"
      />
      <label className={`drag-drop-container ${dragActive ? "active" : ""}`}>
        <div className="drag-drop-content">
          <div className="img-cont">
            <Image
              src={add_photo_alternate_icon}
              width={32}
              height={32}
              alt="add alternate icon"
            />
          </div>
          <div className="drag-drop-text">
            <p className="font-bold text-purple">
              Tap or drag and drop to upload Image
            </p>
            <span>PNG, JPEG</span>
          </div>
        </div>
      </label>
      {dragActive && (
        <div
          className="drag-file-overlay"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </div>
  );
};

export default CustomDragDrop;
```

Here's what's happening in the important parts in the JSX code for the `CustomDragDrop` component:

#### Main Container

```tsx
<div onDragEnter={handleDrag} className="custom-drag-drop form-control">
```

Here we have,

- The main container for the custom file upload field.
- The `onDragEnter` event triggers the `handleDrag` function to update the `dragActive` state.
- CSS classes are applied for styling.

#### Hidden File Input

```tsx
<input ref={FileInput} type="file" name="file" id="file" onChange={handleChange} accept="image/jpeg, image/jpg, image/png" />
```

Here we have,

- A hidden file input for selecting files.
- `ref` is used to create a reference to the file input element.
- `onChange` triggers the `handleChange` function when a file is selected.

#### Drag-and-Drop Area

```tsx
<label className={`drag-drop-container ${dragActive ? "active" : ""}`}>
```

Here we have a container for the drag-and-drop area with conditional classes based on `dragActive` state.
This provides visual feedback when a file is dragged over.

#### Icon

```tsx
<div className="img-cont">
 <Image
   src={add_photo_alternate_icon}
   width={32}
   height={32}
   alt="add alternate icon"
 />
</div>
```

- An icon container.
- Uses `next/image` component to render the SVG image.

#### Text Content

```tsx
<div className="drag-drop-text">
```

This element:

- Contains text content for the drag-and-drop area.
- Includes instruction and accepted file types.

#### Drag File Overlay

```tsx
{dragActive && (<div className="drag-file-overlay" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>)}
```

Here we have,

- A conditional rendering that shows the overlay when `dragActive` is `true`.
- The overlay covers the entire container and handles drag events (e.g., `onDragEnter`, `onDragLeave`, `onDragOver`, `onDrop`) to manage the `dragActive` state and file drop events.

## Step 3: Create ExampleForm Component

Now, let's create the ExampleForm component in `src/components/ExampleForm.js`:

```jsx
// src/components/ExampleForm.js

import React, { useState } from "react";
import CustomDragDrop from "./CustomDragDrop";
import Image from "next/image";

const ExampleForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState("");

  const [removeFile, setRemoveFile] = useState(false);

  const generatePreview = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewURL(reader.result as string);
    };
  };

  const handleUpdateFile = (file: File) => {
    const isValid = file.type === "image/png" || file.type === "image/jpeg";
    if (!isValid) {
      alert("Please upload a valid image file");
      return;
    }
    generatePreview(file);
    setFile(file);
    setRemoveFile(false);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewURL("");
    setRemoveFile(true);
  };

  return (
    <div className="wrapper">
      <header className="form-step-header">
        <h3>Please upload your logo here</h3>
      </header>

      <div className="form-body">
        {!file && (
          <CustomDragDrop
            updateFileUpload={handleUpdateFile}
            removeFile={removeFile}
          />
        )}

        <div className="uploaded-images-cont">
          {file && (
            <div className="uploaded-image img-cont">
              <div className="wrapper">
                {previewURL && (
                  <Image
                    src={previewURL}
                    width={40}
                    height={40}
                    alt={"preview image"}
                  />
                )}
                {previewURL && (
                  <div className="uploaded-image-overlay">
                    <button
                      onClick={handleRemoveFile}
                      type="button"
                      className="cta w-icon"
                    >
                      <XMarkIcon className="icon" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="action-cont">
        <button className="cta">Next</button>
      </div>
    </div>
  );
};

export default ExampleForm;
```

## Step 4: Styling

If you're using Tailwind, for styling the components, you can add the following styles to the `globals.css` file:

```css
.custom-drag-drop {
  @apply relative w-full;
}

.custom-drag-drop input[type="file"] {
  @apply absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer;
}

.drag-drop-container {
  @apply p-8 py-12 bg-slate-50 border-2 border-dashed border-purple rounded-lg;
}

.custom-drag-drop input[type="file"]:focus ~ .drag-drop-container,
.drag-drop-container.active {
  @apply border-purple-600 bg-purple-600/10;
}

.custom-drag-drop .drag-drop-container .drag-drop-content {
  @apply flex flex-col items-center gap-4;
}

.custom-drag-drop .drag-drop-container .drag-drop-text {
  @apply text-center;
}

.drag-file-overlay {
  @apply absolute top-0 left-0 w-full h-full z-20;
}

.uploaded-images-cont {
  @apply flex gap-4 p-4;
}

.uploaded-image {
  @apply grow p-2 text-center bg-gray-50 border border-gray-100 rounded-lg;
}

.uploaded-image > .wrapper {
  @apply relative flex flex-col gap-2 min-h-[7rem];
}

.uploaded-image.img-cont img {
  @apply grow h-60 bg-gray-100 rounded-md;
}

.uploaded-image-overlay {
  @apply absolute top-0 left-0 flex flex-col items-center justify-center gap-2 text-white w-full h-full bg-gray-900/20 rounded-lg;
}

```

Or you can create CSS files (e.g., `CustomDragDrop.css` and `ExampleForm.css`) and import them into their respective components

## Conclusion

In this tutorial, you have learned how to create a custom file upload component with drag-and-drop functionality in React. You can now use this component in various forms and applications to provide users with a seamless file upload experience.

Remember to customize the styling according to your application's design and requirements. Feel free to extend the component's functionalities to suit your specific needs, such as multiple file uploads, file size limitations, or file type restrictions. Happy coding!
