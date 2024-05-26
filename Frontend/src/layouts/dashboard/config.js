import { Chip, SvgIcon } from '@mui/material';
import AlignLeft02Icon from '../../icons/untitled-ui/duocolor/align-left-02';
import BarChartSquare02Icon from '../../icons/untitled-ui/duocolor/bar-chart-square-02';
import Building04Icon from '../../icons/untitled-ui/duocolor/building-04';
import CalendarIcon from '../../icons/untitled-ui/duocolor/calendar';
import CheckDone01Icon from '../../icons/untitled-ui/duocolor/check-done-01';
import CreditCard01Icon from '../../icons/untitled-ui/duocolor/credit-card-01';
import CurrencyBitcoinCircleIcon from '../../icons/untitled-ui/duocolor/currency-bitcoin-circle';
import File01Icon from '../../icons/untitled-ui/duocolor/file-01';
import GraduationHat01Icon from '../../icons/untitled-ui/duocolor/graduation-hat-01';
import HomeSmileIcon from '../../icons/untitled-ui/duocolor/home-smile';
import LayoutAlt02Icon from '../../icons/untitled-ui/duocolor/layout-alt-02';
import LineChartUp04Icon from '../../icons/untitled-ui/duocolor/line-chart-up-04';
import Lock01Icon from '../../icons/untitled-ui/duocolor/lock-01';
import LogOut01Icon from '../../icons/untitled-ui/duocolor/log-out-01';
import Mail03Icon from '../../icons/untitled-ui/duocolor/mail-03';
import Mail04Icon from '../../icons/untitled-ui/duocolor/mail-04';
import MessageChatSquareIcon from '../../icons/untitled-ui/duocolor/message-chat-square';
import ReceiptCheckIcon from '../../icons/untitled-ui/duocolor/receipt-check';
import Share07Icon from '../../icons/untitled-ui/duocolor/share-07';
import ShoppingBag03Icon from '../../icons/untitled-ui/duocolor/shopping-bag-03';
import ShoppingCart01Icon from '../../icons/untitled-ui/duocolor/shopping-cart-01';
import Truck01Icon from '../../icons/untitled-ui/duocolor/truck-01';
import Upload04Icon from '../../icons/untitled-ui/duocolor/upload-04';
import Users03Icon from '../../icons/untitled-ui/duocolor/users-03';
import XSquareIcon from '../../icons/untitled-ui/duocolor/x-square';
import RouteIcon from '@mui/icons-material/Route';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import ModelTrainingOutlinedIcon from '@mui/icons-material/ModelTrainingOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { tokens } from '../../locales/tokens';
import { paths } from '../../paths';


export const getSections = (t, accountType) => [
  {
    items: [
      {
        title: t(tokens.nav.overview),
        path: paths.dashboard.index,
        icon: (
          <SvgIcon fontSize="small">
            <HomeSmileIcon />
          </SvgIcon>
        )
      },
      ...accountType === "LEARNER" ? [{
        title: t(tokens.nav.learningPath),
        path: paths.dashboard.learningPaths.index,
        icon: (
          <SvgIcon fontSize="small">
            <RouteIcon />
          </SvgIcon>
        )
      }] : [],
      {
        title: t(tokens.nav.academy),
        path: paths.dashboard.academy.index,
        icon: (
          <SvgIcon fontSize="small">
            <GraduationHat01Icon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.explore),
        path: paths.dashboard.explore,
        icon: (
          <SvgIcon fontSize="small">
            <SearchOutlinedIcon />
          </SvgIcon>
        )
      },
    ]
  },
  {
    subheader: t(tokens.nav.models),
    items: [
      {
        title: t(tokens.nav.model),
        path: paths.dashboard.model,
        icon: (
          <SvgIcon fontSize="small">
            <ModelTrainingOutlinedIcon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.modelList),
            path: paths.dashboard.model.index
          },
          {
            title: t(tokens.nav.modelCreate),
            path: paths.dashboard.model.create
          }
        ]
      },
      {
        title: t(tokens.nav.notebook),
        path: paths.dashboard.code,
        icon: (
          <SvgIcon fontSize="small">
            <CodeOutlinedIcon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.notebookList),
            path: paths.dashboard.notebook.index
          },
          {
            title: t(tokens.nav.notebookCreate),
            path: paths.dashboard.notebook.create
          }
        ]
      },
      {
        title: t(tokens.nav.dataset),
        path: paths.dashboard.dataset,
        icon: (
          <SvgIcon fontSize="small">
            <TableChartOutlinedIcon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.datasetList),
            path: paths.dashboard.dataset.index
          },
          {
            title: t(tokens.nav.datasetCreate),
            path: paths.dashboard.dataset.create
          }
        ]
      },
    ]
  },
  {
    subheader: t(tokens.nav.communications),
    items: [
      {
        title: t(tokens.nav.forum),
        path: paths.dashboard.forum.index,
        icon: (
          <SvgIcon fontSize="small">
            <Users03Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.forumList),
            path: paths.dashboard.forum.index
          },
          {
            title: t(tokens.nav.forumCreate),
            path: paths.dashboard.forum.create
          }
        ]
      },
    ]
  },
  {
    subheader: t(tokens.nav.personal),
    items: [
      {
        title: t(tokens.nav.personal_info),
        path: paths.dashboard.personal_info,
        icon: (
          <SvgIcon fontSize="small">
            <AccountBoxOutlinedIcon />
          </SvgIcon>
        )
      },
    ]
  },
  accountType === "ADMIN" && {
    subheader: t(tokens.nav.admin),
    items: [
      {
        title: t(tokens.nav.lm_manage),
        path: paths.dashboard.lm_manage,
        icon: (
          <SvgIcon fontSize="small">
            <ArticleOutlinedIcon />
          </SvgIcon>
        )
      },
      {
        title: t(tokens.nav.topic_manage),
        path: paths.dashboard.topic_manage,
        icon: (
          <SvgIcon fontSize="small">
            <AccountTreeOutlinedIcon />
          </SvgIcon>
        )
      },
      {
        title: t(tokens.nav.account_manage),
        path: paths.dashboard.account_manage.index,
        icon: (
          <SvgIcon fontSize="small">
            <ManageAccountsOutlinedIcon />
          </SvgIcon>
        )
      },
    ]
  },
];
