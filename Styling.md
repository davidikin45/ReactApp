# Styling React App

* [Styling React Components Course](https://app.pluralsight.com/library/courses/react-styling-components/table-of-contents)
* [4 ways to style react components](https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822)

## Differences

| HTML              | React                      |
| ----------------- |----------------------------|
| Global to page    | Encapsulated components    |
| No native modules | Modules by default         |
| Old hat           | Questioning the status quo |

## 1. CSS Stylesheet
* [BEM naming](http://getbem.com/naming/)

```
import React from 'react';
import './DottedBox.css';

const DottedBox = () => (
  <div className="DottedBox">
    <p className="DottedBox_content">Get started with CSS styling</p>
  </div>
);

export default DottedBox;
```

## 2. Inline Styles
* No media queries
* No pseudo selectors
* No keyframe animations

styles.js
```
export default {
    root : {
        position: 'relative',
        overflow: 'hidden'
    }
}
```

component.js
```
import React from 'react';
import styles from './styles.js

const Slide = (props) => {
    return (
        <article style={{...styles.root, ...props.style}}>
            <footer style={styles.footer}>
                <h2 style={styles.title}>{props.title}</h2>
                <div>{props.children}</div>
            </footer>
        </article>
    )
}

export default Slide;
```

```
import React from 'react';

const divStyle = {
  margin: '40px',
  border: '5px solid pink'
};
const pStyle = {
  fontSize: '15px',
  textAlign: 'center'
};

const Box = () => (
  <div style={divStyle}>
    <p style={pStyle}>Get started with inline style</p>
  </div>
);

export default Box;
```

## 3. Radium
* Inline styles++
* media queries
* pseudo selectors
* keyframe animations

## 4. CSS Modules
* [Adding a CSS Modules Stylesheet](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet)
* available with react-scripts@2.0.0 and higher
* [Override CSS Modules in React Components](https://github.com/pluralsight/react-styleable)
* [No need for BEM naming](http://getbem.com/naming/)

DashedBox.module.css
```
.root {
  background-color: red;
}
```

another-stylesheet.css
```
.error {
  color: red;
}
```

DashedBox.js
```
import React from 'react';
import classes from './DashedBox.module.css'; / Import css modules stylesheet as styles
import './another-stylesheet.css'; // Import regular stylesheet

const DashedBox = () => (
  <div className={classes.root}>
    <p className={classes.content}>Get started with CSS Modules style</p>
  </div>
);

export default DashedBox;
```

Result
* No clashes from other .root class names

```
<div class="DashedBox_root_ax7yz">
    <p className={DashedBox_content_ax3yz}>Get started with CSS Modules style</p>
</div>
```

```
<div className={`class1 ${classes.root} ${this.state.active === true ? classes.active : ''}`}></div>
<li className={[activeClass, data.klass, "main-class"].join(' ')} />
```

## Composes with CSS Modules
default-links.css
```
.link {
    color: orange;
}
```
my-component.css
```
.link {
    composes: link from "./default-links.css";
    color: pink;
}
```

## Authors

* **David Ikin**