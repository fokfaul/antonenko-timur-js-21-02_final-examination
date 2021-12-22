import './Comments.css';
import {useState} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAction } from '../../actions/CommentsActions';
import {Comment} from '../../components/comment/Comment';
import {Loader} from '../../components/loader/Loader';
import {ArrowNav} from '../../components/arrow_nav/ArrowNav';

import useOnceOnMount from '../../hooks/useOnceOnMount';
import useScrollToTop from '../../hooks/useScrollToTop';

const Comments = ({ commentsList, page, limit, total, load, error, loading, idPost }) => {
    const limitView = 2;
    const [counter, setCounter] = useState(1);
    useScrollToTop();
    const getNewComments = (p) => load(idPost, p, limit);
    const nextComments = () => {
        if((counter+1)*limitView>limit)
        {
            setCounter(1);
            getNewComments(page+1);
        }
        else
            setCounter(counter+1);
    };
    const previousComments = () => {
        if(counter>1)
           setCounter(counter-1);
        else
        {
           getNewComments(page-1);
           setCounter(limit/limitView);
        }
    };
    useOnceOnMount(() => load(idPost, page, limit));
    return (
      <div className="post__comments">
          {loading? <Loader/> : error? alert(error) :
              <div className="post__comments__view">
                {
                    (total/limitView>1 && (counter!==1 || page!==0)) ?
                        <ArrowNav mode="reverse" moveToPage={previousComments}/> : ""
                }
                <div className="post__comments__list">
                  {commentsList?.slice((counter-1)*limitView, counter*limitView).map((elem, index) => (
                    <Comment comment={elem} key={index}/>
                  ))}
                </div>
                {
                    (total/limitView>1 && (page*limit+(counter+1)*limitView) <= total) ?
                        <ArrowNav moveToPage={nextComments}/> : ""
                }
              </div>
          }
      </div>
    );
}

export default connect(
  (state) => ({
    commentsList: state.comments.commentsList,
    page: state.comments.page,
    total: state.comments.total,
    loading: state.comments.loading,
    limit: state.comments.limit,
    error: state.comments.error,
    idPost: state.postPage.postInfo.id,
  }),
  (dispatch) => ({
    load: bindActionCreators(loadAction, dispatch),
  }),
)(Comments);
