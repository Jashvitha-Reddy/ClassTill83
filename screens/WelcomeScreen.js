import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
//import SantaAnimation from '../components/SantaClaus';

export default class WelcomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            confirmPassword: '',
            isModalVisible: 'false'
        }
    }
    userLogin = (emailId, password) => {
        firebase.auth().signInWithEmailAndPassword(emailId, password)
            .then(() => {
                this.props.navigation.navigate('DonateBooks')

            })
            .catch(function (error) {
                var errorcode = error.code
                var errormessage = error.errormessage
                return Alert.alert(errormessage)
            })
    }
    userSignUp = (emailId, password, confirmPassword) => {
        if (password !== confirmPassword) {
            return Alert.alert("Password does not match")

        }
        else {
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
                .then(() => {
                    db.collection('users').add({
                        first_Name: this.state.firstName,
                        last_Name: this.state.lastName,
                        contact: this.state.contact,
                        email_Id: this.state.emailId,
                        address: this.state.address
                    })
                    return Alert.alert("user added sucusessfully", '', [{ text: 'OK', onPress: () => this.setState({ "isModalVisible": false }) }]
                    )

                })


                .catch((error) => {
                    var errorcode = error.code
                    var errormessage = error.errormessage
                    return Alert.alert(errormessage)
                })
        }
    }
    showModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModalVisible}>
                <View style={styles.madalContainer}>
                    <ScrollView style={{ width: '100%' }}>
                        <KeyboardAvoidingView style={styles.keyBoardAvoidingView}>
                            <Text style={styles.modalTittle}>
                                Resgistration
                               </Text>
                            <TextInput style={styles.formTextInput}
                                placeholder={"firstName"}
                                maxLength={8}
                                onChangeText={(text) => {
                                    this.setState({ firstName: text })
                                }}
                            />
                            <TextInput style={styles.formTextInput}
                                placeholder={"lastName"}
                                maxLength={8}
                                onChangeText={(text) => {
                                    this.setState({ lastName: text })
                                }}
                            />

                            <TextInput style={styles.formTextInput}
                                placeholder={"contact"}
                                maxLength={10}
                                keyboardType={'numeric'}
                                onChangeText={(text) => {
                                    this.setState({ contact: text })
                                }}
                            />

                            <TextInput style={styles.formTextInput}
                                placeholder={"address"}
                                multiline={true}
                                onChangeText={(text) => {
                                    this.setState({ address: text })
                                }}
                            />

                            <TextInput style={styles.formTextInput}
                                placeholder={"emailId"}
                                keyboardType={'email-address'}
                                onChangeText={(text) => {
                                    this.setState({ emailId: text })
                                }}
                            />

                            <TextInput style={styles.formTextInput}
                                placeholder={"password"}
                                secureTextEntry={'true'}
                                onChangeText={(text) => {
                                    this.setState({ password: text })
                                }}
                            />

                            <TextInput style={styles.formTextInput}
                                placeholder={"confirmPassword"}
                                secureTextEntry={'true'}
                                onChangeText={(text) => {
                                    this.setState({ confirmPassword: text })
                                }}
                            />

                            <View style={styles.modalBackButton}>
                                <TouchableOpacity style={styles.registerButton}
                                    onPress={() => this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)}
                                >
                                    <Text style={styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity style={styles.cancelButton}
                                    onPress={() => this.setState({ "isModalvisible": false })}
                                >
                                    <Text style={{ color: '#ff5722' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>

        )
    }
    render() {
        return (
            <View style={styles.profileContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {this.showModal()}
                    <Text style={styles.title}>Santa App </Text></View>
                <TextInput
                    style={styles.loginBox}
                    placeholder="Example@santa.com"
                    keyboardType="email-adress"
                    placeholderTextColor="#fff"
                    onChangeText={(text => {
                        this.setState({
                            emailId: text
                        })
                    })}
                />
                <TextInput
                    style={styles.loginBox}
                    placeholder="enter password"
                    secureTextEntry={true}
                    placeholderTextColor="#fff"
                    onChangeText={(text => {
                        this.setState({
                            password: text
                        })
                    })}
                />
                <TouchableOpacity
                    style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
                    onPress={() => {
                        this.userLogin(this.state.emailId, this.state.password)
                    }}>
                    <Text style={styles.buttonText}>Login</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.setState({ isModalVisible: true })
                    }}>
                    <Text style={styles.buttonText}>Sign Up</Text>

                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    loginBox: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: '#ff8a65',
        fontSize: 20,
        margin: 10,
        paddingLeft: 10,
    },

    container: {
        flex: 1,
        backgroundColor: '#f8be5'
    },
    tittle: {
        fontSize: 65,
        fontWeight: 300,
        paddingBottom: 30,
        color: '#ff3d00',
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: "#ff9800",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8, },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
    },

    buttonText: {
        color: '#ffff',
        fontWeight: '200',
        fontSize: 20
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center'
    },

    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    KeyboardAvoidingView: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    modalTitle: { 
        justifyContent: 'center', 
        alignSelf: 'center', 
        fontSize: 30, 
        color: '#ff5722', 
        margin: 50 },
    modalContainer: { 
        flex: 1, 
        borderRadius: 20, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: "#ffff", 
        marginRight: 30,
         marginLeft: 30, 
         marginTop: 80, 
         marginBottom: 80
         },
    formTextInput:{ 
        width:"75%", 
        height:35, 
        alignSelf:'center', 
        borderColor:'#ffab91', 
        borderRadius:10, 
        borderWidth:1, 
        marginTop:20, 
        padding:10 
    },
    registerButton:{ 
        width:200, 
        height:40, 
        alignItems:'center', 
        justifyContent:'center', 
        borderWidth:1, 
        borderRadius:10, 
        marginTop:30 
    },
    registerButtonText:{ 
        color:'#ff5722', 
        fontSize:15, 
        fontWeight:'bold' 
    },
    cancelButton:{ 
        width:200,
         height:30, 
         justifyContent:'center', 
         alignItems:'center', 
         marginTop:5
         },

})

