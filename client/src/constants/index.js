
export const errorOptions = {
    position: 'top-right',
    duration: 5000,
    style: {
      backgroundColor: 'red',
      color: '#fff',
      borderRadius: '10px',
      padding: '5px 10px',
      marginTop: '2rem'
    }
}
  
export const successOptions = {
    position: 'top-right',
    duration: 5000,
    style: {
      backgroundColor: 'lightgreen',
      color: '#fff',
      borderRadius: '10px',
      padding: '5px 10px',
      marginTop: '2rem'
    }
}

/** react-quill text editor modifications */
export const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export const modules = {
  toolbar: [
      [{ 'header': [1, 2, 3, false]}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
}
