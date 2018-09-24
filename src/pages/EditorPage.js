import React from 'react';
import EditorTemplate from 'components/editor/EditorTemplate';
import EditorHeader from 'components/editor/EditorHeader';
import EditorPaneContainer from 'containers/editor/EditorPaneContainer'; // redux module을 연결한 container
import PreviewPaneContainer from 'containers/editor/PreviewPaneContainer';

const EditorPage = () =>{
    return(
        <EditorTemplate header={<EditorHeader/>}
                        editor={<EditorPaneContainer/>}
                        preview={<PreviewPaneContainer/>}/>
    );
};

export default EditorPage;