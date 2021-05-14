import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,FlatList,ScrollView} from 'react-native';
import{Card,Header,Icon,ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config.js';

export default class MyDonationScreen extends React.Component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allDonations:[]
        }
        this.requestRef=null
    }
    getAllDonations=()=>{
        this.requestRef=db.collection("all_donations").where("donar_id",'==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var allDonations=snapshot.doxs.map(document=>document.data());
            this.setState({
                allDonations:allDonations
            })
        })
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,i})=>(
        <ListItem
        key={i}
        title={item.book_name}
        subtitle={"rquestedby:"+item.requested_by+"\nstatus:"+item.request_status}
        leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>} 
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={<TouchableOpacity style={styles.button}>
                    <Text style={{color:'#ffff'}}>Send Book</Text>
        </TouchableOpacity>}
        bottomDivider={}
        />
    )
    componentDidMount(){
        this.getAllDonations()
    }
    componentWillUnmount(){
        this.requestRef()
    }
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader navigation={this.props.navigation} tittle="My Donations"/>
                <View style={{flex:1}}>
                    {this.state.allDonations.length===0
                    ?(<View style={styles.subtitle}>
                        <Text style={{fontSize:20}}>List Of all Book Donations</Text>
                        </View>
                        )
                        :(<FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.allDonations}
                        renderItem={this.renderItem}
                        />)
                         }
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    button:{
        width:100,
        height:30,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#ff5722",
        shadowColor:"#0000",
        shadowOffset:{width:0,height:8},
        elevation:60
    },
    subtitle:{
        flex:1,
        fontSize:20,
        justifyContent:"center",
        alignItems:"center"
    }
})