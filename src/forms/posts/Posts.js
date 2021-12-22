import './Posts.css';
import {useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAction as loadActionListPost } from '../../actions/PostsActions';
import { loadAction as loadActionPostInfo } from '../../actions/PostPageActions';
import {Container} from '../../wrappers/container/Container';
import {Post} from '../../components/post/Post';
import {WinLoader} from '../../windows/loader/WinLoader';
import {PostWindow} from '../../windows/post/Post';
import { Pagination } from 'antd';

import useOnceOnMount from '../../hooks/useOnceOnMount';
import useScrollToTop from '../../hooks/useScrollToTop';

const Posts = ({
    postsList, page, limit, total, loadingList, loadListPost, error,
    loadingPost, postInfo, loadPostInfo
}) => {
    useScrollToTop();
    const [displayPost, setDisplayPost] = useState(false);

    const moveToPage = (toPage, pageSize) => loadListPost(toPage-1, limit);
    const closePostWindow = () => {setDisplayPost(false)};
    const openPostWindow = (id) => {
        setDisplayPost(true);
        loadPostInfo(id);
    }

    useOnceOnMount(() => loadListPost(page, limit));

    return (
      <section className="posts">
          {loadingList? <WinLoader/> : error? alert(error) :
              <Container>
                <div className="posts__list">
                  {postsList.map((elem, index) => (
                    <Post post={elem} key={index} openWindow={openPostWindow}/>
                  ))}
                </div>
                <Pagination size="small" defaultCurrent={page+1} pageSize={limit} total={total} showSizeChanger={false}
                    showLessItems={true} onChange={moveToPage}/>
              </Container>
          }
          {displayPost? loadingPost? <WinLoader/> : <PostWindow post={postInfo} closeWindow={closePostWindow}/> : ""}
      </section>
    );
}

export default connect(
  (state) => ({
    postsList: state.posts.postsList,
    page: state.posts.page,
    total: state.posts.total,
    loadingList: state.posts.loading,
    limit: state.posts.limit,
    error: state.posts.error,
    loadingPost: state.postPage.loading,
    postInfo: state.postPage.postInfo,
  }),
  (dispatch) => ({
    loadListPost: bindActionCreators(loadActionListPost, dispatch),
    loadPostInfo: bindActionCreators(loadActionPostInfo, dispatch),
  }),
)(Posts);