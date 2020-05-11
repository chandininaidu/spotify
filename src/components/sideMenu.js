import React from "react";
import {
  getTrackList,
  getPlayListDetails,
} from "../store/action/spotifyAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import {
  Divider,
  Drawer,
  Hidden,
  List,
  TableCell,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableRow,
  Typography,
  TableBody,
  TableContainer,
  Paper,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import RadioIcon from "@material-ui/icons/Radio";
import AlbumIcon from "@material-ui/icons/Album";
import SearchIcon from "@material-ui/icons/Search";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
const sideMenu = [
  {
    id: 1,
    name: "Browse",
    icon: <VisibilityIcon />,
  },
  {
    id: 2,
    name: "Activity",
    icon: <WatchLaterIcon />,
  },
  {
    id: 3,
    name: "Radio",
    icon: <RadioIcon />,
  },
];
const preferences = [
  {
    id: 1,
    name: "Songs",
    icon: (
      <i
        className="fa fa-music "
        style={{ fontSize: "23px" }}
        aria-hidden="true"
      ></i>
    ),
  },
  {
    id: 2,
    name: "Albums",
    icon: <AlbumIcon />,
  },
  {
    id: 3,
    name: "Artists",
    icon: <VisibilityIcon />,
  },
  {
    id: 4,
    name: "Local Files",
    icon: <VisibilityIcon />,
  },
];

const drawerWidth = 350;

const styles = (theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: "15%",
    borderRight: "black",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  search: {
    background: "#322a2a",
    borderRadius: "20px",
    marginTop: "36px",
    padding: "7px",
    margin: "16px",
  },
  tableCell: {
    color: "white",
    borderBottomColor: "black",
  },
});
const rows = [{ calories: "fg" }];
const DrawerComp = (props) => (
  <div className="bg-black text-gray-500  h-full">
    <div className="flex flex-row w-full mt-2 ">
      <div className="w-1/2">
        {["red", "orange", "green"].map((_color) => (
          <i
            className="fa fa-circle "
            style={{ color: _color, padding: "5px", fontSize: "20px" }}
          ></i>
        ))}
      </div>
      <div className="flex w-1/2 justify-end">
        <ArrowBackIosIcon className="" />
        <ArrowForwardIosIcon />
      </div>
    </div>

    <Paper className={props.classes.search}>
      <img src="" />
      <SearchIcon />
    </Paper>
    <Typography className="flex pl-4">Main</Typography>
    <List>
      {sideMenu.map((_sideFilter, index) => (
        <ListItem button key={_sideFilter.id}>
          <ListItemIcon style={{ color: "green" }}>
            {_sideFilter.icon}
          </ListItemIcon>
          <ListItemText primary={_sideFilter.name} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <Typography className="flex pl-4">Your Music</Typography>
    <List>
      {preferences.map((text, index) => (
        <ListItem button key={text.id}>
          <ListItemIcon style={{ color: "green" }}>{text.icon}</ListItemIcon>
          <ListItemText primary={text.name} />
        </ListItem>
      ))}
    </List>
  </div>
);
class SideMenu extends React.Component {
  state = {
    playList: "",
  };
  componentDidMount = () => {
    /**api call to get playlist */
    this.props.getPlayListDetails(this.props.token);
  };
  render() {
    const { classes, trackList, playList } = this.props;
    const filterData = trackList && trackList.items.map((_value) => _value);
    console.log(trackList);

    return (
      <div className=" flex bg-black h-screen w-full">
        <div style={{ width: "15%" }} className="h-full bg-black">
          <nav className="" aria-label="mailbox folders">
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                <DrawerComp classes={classes} />
              </Drawer>
            </Hidden>
          </nav>
        </div>

        {/** view component */}
        <div style={{ width: "85%" }} className="h-full text-white ">
          <div style={{ height: "75%", overflow: "auto" }}>
            {playList &&
              playList.map((_play) => (
                <div
                  className="flex flex-row p-4 "
                  style={{ background: "#141313" }}
                >
                  <img
                    className=""
                    src={_play && _play.images[0].url}
                    style={{ width: "200px", height: "200px" }}
                  />
                  <div className="text-white flex flex-col-reverse  pl-4">
                    <div>{_play.owner.display_name}</div>
                    <Typography variant="h3">{_play.name}</Typography>
                  </div>
                </div>
              ))}
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="simple table"
              >
                <TableBody className="bg-black">
                  {filterData &&
                    filterData.map((_data, index) => (
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          <img
                            src={_data.track.album.images[2].url}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderBottomColor: "black",
                            }}
                          />
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <audio src={_data.track.href}></audio>
                          <PlayArrowIcon
                            className="text-green"
                            onClick={_data.track.href}
                          />
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {index + 1 + "."} {_data.track.name}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {_data.track.artists[0].name}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {(_data.track.duration_ms / 60000).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div>
            {trackList && trackList.items[0].track.preview_url && (
              <audio controls preload="auto" className="w-full mt-10">
                <source
                  src={trackList && trackList.items[0].track.preview_url}
                  onTimeUpdate="4:12"
                  // src="https://p.scdn.co/mp3-preview/ead8ca5aaed8d3fccb90c6ff21720c17561bce87?cid=6c59d2b966bf4fdf84a8f7d0df4848ad"
                  type="audio/mpeg"
                />
              </audio>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (items) => ({
  trackList: items.SpotifyReducer.trackList,
  playList: items.SpotifyReducer.playList,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTrackList,
      getPlayListDetails,
    },
    dispatch
  );
}

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(SideMenu)
);
