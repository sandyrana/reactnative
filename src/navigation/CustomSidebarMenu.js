//This is an example code for Navigation Drawer with Custom Side bar//
import React, {Component} from 'react';
import {Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons,AntDesign,Entypo  } from '@expo/vector-icons';
import {getUserDetails, logout} from '../utils/LocalStorage';

export default class CustomSidebarMenu extends Component {
    
    constructor() {
        super();
        this.state = {
            user: null,
        };
        //Setting up the Main Top Large Image of the Custom Sidebar
       

        this.proileImage =
            'https://aboutreact.com/wp-content/uploads/2018/07/sample_img.png';

        this.items = [
            {
                navOptionThumb: '<Entypo name="home" size={24} color="black" />',
                navOptionName: 'Home',
                screenToNavigate: 'Home',
            },
            {
                navOptionThumb: 'user',
                navOptionName: 'My Profile',
                screenToNavigate: 'Profile',
            },
           
        ];
    }

    async componentDidMount() {
        let user = await getUserDetails();       
        this.setState({user: user});
    }

    logoutUser = () => {
        logout();
        this.props.navigation.replace('Login');

        // this.props.navigation.dispatch(
        //     CommonActions.reset({
        //         index: 1,
        //         routes: [{name: 'Login'}],
        //     }),
        // );
    };

    getActiveRouteState = name => {
    //     let active = false;
    //     if (this.props.state !== undefined) {
    //         let activeIndex = this.props.state.index;
    //         let activeRouteName = this.props.state.routes[activeIndex].name;
    //         if (activeRouteName === name) {
    //             active = true;
    //         }
    //     }
    //     return active;
    };

    render() {
        return (
            <View style={styles.sideMenuContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.profileContainer}>
                        <Image
                            source={require('../assets/images/user.png')}
                            style={styles.sideMenuProfileIcon}
                        />
                        {this.state.user !== null ? (
                            <View>
                            <Text style={styles.title}>{this.state.user.name}</Text>
                            <Text style={styles.email}>{this.state.user.email}</Text>
                            </View>
                           
                           

                        ) : null}
                    </View>

                    <View
                        style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#e2e2e2',
                        }}
                    />

                    <View style={{width: '100%'}}>
                        {this.items.map((item, key) => (
                           
                            <TouchableOpacity
                                onPress={() => {
                                    global.currentScreenIndex = key;
                                    this.props.navigation.navigate(item.screenToNavigate);
                                }}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingTop: 15,
                                    paddingBottom: 15,
                                    marginTop: 10,
                                    marginBottom:10,
                                    backgroundColor: this.getActiveRouteState(
                                        item.screenToNavigate,
                                    )
                                        ? '#F7F7F7'
                                        : "white",
                                }}
                                key={key}>
                                <View style={{marginRight: 15, marginLeft: 20}}>
                               
                               
                                  {/* <Icon
                                        name={item.navOptionThumb}
                                        size={22}
                                        color={
                                            this.getActiveRouteState(item.screenToNavigate)
                                                ? 'red'
                                                : '#808080'
                                        }
                                    /> */}
                                </View>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        // color: this.getActiveRouteState(item.screenToNavigate)
                                        //     ? Color.colorPrimary
                                        //     : 'black',
                                    }}
                                >
                                    {item.navOptionName}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}>
                            <View style={{marginRight: 15, marginLeft: 20}}>                        
                              <AntDesign name="logout" size={24} color="black" />
                            </View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: 'black',
                                }}
                                onPress={() => {
                                    this.logoutUser();
                                }}>
                                Logout
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
//const BAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;
const styles = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
    },
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
    },
    title: {
        // fontFamily: Font.primarySemiBold,
        // color: Color.black,
        fontSize: 16,
        marginLeft: 10,
    },
    email:{
        fontSize:10,
        marginLeft:10,
        color:"grey"
    },

    profileContainer: {
        width: '100%',
        height: 80,
        // marginTop: BAR_HEIGHT,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: Color.iconBG,
        paddingLeft: 20,
        paddingRight: 20,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        // backgroundColor: Color.colorPrimary,
        display: 'flex',
    },
});
