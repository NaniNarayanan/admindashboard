import React, { Component } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState,convertToRaw } from 'draft-js';
import draftToHtml from "draftjs-to-html";
import { Space } from 'antd';

export default class TextEditor extends Component {

    state ={
        editorState: EditorState.createEmpty()
    }

    onEditorStateChange =(editorState) =>{
        this.setState({
            editorState,
        });
    }





  render() {
    const {editorState} = this.state
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())) )
    return (
      <div>
        <Space>
           

        <div style={{marginLeft:"45px",border:"1px solid black",width:"1000px",height:"240px", maxWidth:"100%", maxHeight:"100%"}}>
            <Editor   editorState={editorState} toolbarClassName="toolbarClassName" wrapperClassName="wrapperClassName"editorClassName="editorClassName"onEditorStateChange={this.onEditorStateChange}/>
      </div>
            {/* <textarea value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}>
        
            </textarea> */}
         </Space>

      </div>
    )
  }
}