import { marked } from 'marked';
import Prism from 'prismjs';
import { useState } from 'react';
import { placeholder } from './placeholder';

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  },
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

function App() {
  const [markdown, setMarkdown] = useState(placeholder);
  const [editorMaximized, setEditorMaximized] = useState(false);
  const [previewMaximized, setPreviewMaximized] = useState(false);

  function handleChange(e) {
    setMarkdown(e.target.value);
  }
  function handleEditorMaximize() {
    setEditorMaximized((prev) => !prev);
  }
  function handlePreviewMaximize() {
    setPreviewMaximized((prev) => !prev);
  }
  const classes = editorMaximized
    ? ['editorWrap maximized', 'previewWrap hide', 'fa fa-compress']
    : previewMaximized
    ? ['editorWrap hide', 'previewWrap maximized', 'fa fa-compress']
    : ['editorWrap', 'previewWrap', 'fa fa-arrows-alt'];
  return (
    <div>
      <div className={classes[0]}>
        <Toolbar
          icon={classes[2]}
          onClick={handleEditorMaximize}
          text='Editor'
        />
        <Editor markdown={markdown} onChange={handleChange} />
      </div>
      <div className={classes[1]}>
        <Toolbar
          icon={classes[2]}
          onClick={handlePreviewMaximize}
          text='Previewer'
        />
        <Preview markdown={markdown} />
      </div>
    </div>
  );
}

export default App;

const Toolbar = (props) => {
  return (
    <div className='toolbar'>
      <i className='fa fa-free-code-camp' title='no-stack-dub-sack' />
      {props.text}
      <i className={props.icon} onClick={props.onClick} />
    </div>
  );
};

const Editor = (props) => {
  return (
    <textarea
      id='editor'
      onChange={props.onChange}
      type='text'
      value={props.markdown}
    />
  );
};

// /*
const Preview = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer }),
      }}
      id='preview'
    />
  );
};
//  */
