import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ListPage, PostPage, EditorPage, NotFoundPage} from 'pages';


const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={ListPage}/>
                <Route path="/page/:page" component={ListPage}/>
                <Route path="/tag/:tag/:page" component={ListPage}/>
                <Route path="/post/:id" component={PostPage}/>
                <Route path="/editor" component={EditorPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    );
};

/*
여기서 사용된 리액트 라우터의 Switch 컴포넌트는, 
설정된 라우트중에서 일치하는 라우트 하나만 보여주는 속성을 가지고 있습니다. 
최하단에 설정된 NotFoundPage 에는, path 를 지정하지 않았기 때문에 어떠한 경우에도 렌더링이 됩니다. 
하지만, Switch 로 감쌌으므로, 먼저 매칭된 한가지의 라우트만 보여주기 때문에 ListPage, PostPage, 혹은 EditorPage 가 보여져야 할때는 렌더링되지 않지만, 
그 어떤 라우트에도 일치하지 않게 된다면, NotFoundPage 가 보여지게 됩니다.
*/
export default App;