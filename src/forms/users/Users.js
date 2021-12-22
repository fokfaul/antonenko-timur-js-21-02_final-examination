import './Users.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadAction } from '../../actions/UsersActions';
import {Container} from '../../wrappers/container/Container';
import {User} from '../../components/user/User';
import {WinLoader} from '../../windows/loader/WinLoader';
import { Pagination } from 'antd';
import { useTranslation } from 'react-i18next';

import useOnceOnMount from '../../hooks/useOnceOnMount';
import useScrollToTop from '../../hooks/useScrollToTop';

const Users = ({usersList, page, limit, total, loading, load, error}) => {
    useScrollToTop();
    const { t } = useTranslation();
    const moveToPage = (toPage, pageSize) => load(toPage-1, limit);
    useOnceOnMount(() => load(page, limit));

    return (
      <section className="users">
          {loading? <WinLoader/> : error? alert(error) :
              <Container>
                <div className="users__list">
                  {usersList.map((elem, index) => (
                    <User
                      imgUrl={elem.picture}
                      name={t("user.title."+elem.title)+". "+elem.firstName+" "+elem.lastName}
                      userId={elem.id}
                      key={index}
                    />
                  ))}
                </div>
                <Pagination size="small" defaultCurrent={page+1} pageSize={limit} total={total} showSizeChanger={false}
                    showLessItems={true} onChange={moveToPage}/>
              </Container>
          }
      </section>
    );
}

export default connect(
  (state) => ({
    usersList: state.users.usersList,
    page: state.users.page,
    total: state.users.total,
    loading: state.users.loading,
    limit: state.users.limit,
    error: state.users.error,
    theme: state.theme.theme
  }),
  (dispatch) => ({
    load: bindActionCreators(loadAction, dispatch),
  }),
)(Users);