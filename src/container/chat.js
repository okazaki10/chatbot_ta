import React, { createRef, useEffect, useRef, useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../globalstyles';

import style from '../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TextInput } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
function Chat(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isipesan, setisipesan] = useState("")
    const [cari, setcari] = useState("")

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const storeData = async (key) => {
        try {
            await AsyncStorage.setItem('key', key)
            global.key = key
        } catch (e) {
            // saving error
        }
    }

    const [spinner, setspinner] = useState(false)

    const [isi, setisi] = useState("")
    const [data, setdata] = useState([{ text: 'Halo, perkenalkan aku bot, ceritakan 9 hal tentang apa saja yang kamu rasakan 2 minggu belakangan ini', id: 1, sender: 'Bot' }])
    const [totalskor, settotalskor] = useState(0)
    const [total, settotal] = useState(0)
    const chat = () => {

        if (isi == "") {
            ToastAndroid.show("Silahkan isi keluhan anda", ToastAndroid.SHORT)
        } else {
            data.push({ text: isi, id: 2, sender: 'User' })
            fetch(global.url + '/?chat=' + isi, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    if (json.errors) {
                        ToastAndroid.show(json.message, ToastAndroid.SHORT)
                    } else {
                        var tag = json.data[0].tag
                        var tagstr = parseInt(tag.substring(4))
                        console.log(tagstr)

                        var data2 = [...data]
                        var text = "tag : " + json.data[0].tag + " akurasi : " + json.data[0].accuracy
                        var pesan = ""
                        if (tagstr == 0) {
                            pesan = "\n\nBagus, Sepertinya keluhanmu tidak memiliki gejala depresi"
                        } else if (tagstr == 1) {
                            pesan = "\n\nHmm, Sepertinya Keluhanmu memiliki gejala depresi ringan"
                        } else if (tagstr == 2) {
                            pesan = "\n\nSepertinya Keluhanmu memiliki gejala depresi sedang, semua pasti bisa dilalui kok (づ ◕‿◕ )づ"
                        } else if (tagstr == 3) {
                            pesan = "\n\nSepertinya Keluhanmu memiliki gejala depresi berat, semua pasti ada jalan kok ٩(＾◡＾)۶"
                        }
                        data2.push({ text: text+pesan, id: 2, sender: 'Bot' })
                        setdata(data2)
                        
                        var totalskor2 = totalskor + tagstr
                        console.log(totalskor)
                        var total2 = total + 1
                        settotalskor(totalskor2)
                        settotal(total2)
                        if (total2 == 9) {
                            var skortotal = totalskor2
                            var teks = ""

                            if (skortotal < 10) {
                                teks = "skor total : " + skortotal + "\n\nSelamat!, Kamu tidak memiliki gejala depresi. Tetapi tetap hubungi dokter jiwa bila ada perburukan gejala"
                            } else if (skortotal >= 10 && skortotal < 15) {
                                teks = "skor total : " + skortotal + "\n\nKamu memiliki gejala depresi ringan. Hubungi dokter jiwa bila gejala dalam 1 bulan bertambah buruk agar dokter bisa memberikan pertimbangan pemberian antidepresan atau psikoterapi singkat"
                            } else if (skortotal >= 15 && skortotal < 20) {
                                teks = "skor total : " + skortotal + "\n\nKamu memiliki gejala depresi sedang. Hubungi dokter jiwa agar dokter bisa memberi anjuran untuk memberikan antidepresan atau psikoterapi"
                            } else if (skortotal >= 20) {
                                teks = "skor total : " + skortotal + "\n\nKamu memiliki gejala depresi berat. Segera hubungi dokter jiwa agar dokter bisa memberi anjuran untuk memberikan antidepresan secara tunggal atau mengkombinasikan dengan psikoterapi intensif"
                            }

                            data2.push({ text: teks, id: 2, sender: 'Bot' })
                            setdata(data2)
                            settotalskor(0)
                            settotal(0)
                        }

                    }
                    //setspinner(false)
                })
                .catch((error) => {
                    console.error(error)
                    ToastAndroid.show(error.message == "Network request failed" ? "Mohon nyalakan internet" : error.message, ToastAndroid.SHORT)
                    //setspinner(false)
                });
            setisi("")
        }
    }



    useState(() => {
        //show()
        //settoread()

    })


    const scrollViewRef = useRef()
    const handleScrollTo = (w, h) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, y: h })
        }
    };
    const [isModalVisible3, setModalVisible3] = useState(false);
    const toggleModal3 = () => {
        setModalVisible3(!isModalVisible3);
    };
    const [isModalVisible2, setModalVisible2] = useState(false);
    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };
    const [itemid, setitemid] = useState()
    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
            <Modal isVisible={isModalVisible3}
                onBackdropPress={toggleModal3}
                onBackButtonPress={toggleModal3}>
                <View style={style.content}>
                    <Text style={[style.nunitosans, { textAlign: "center" }]}>Ubah Pesan</Text>
                    <TextInput onChangeText={setcari} autoCapitalize="none" style={[style.card, { elevation: 5, marginTop: 30, flex: 0 }]} placeholder="Message"></TextInput>
                    <View style={{ flexDirection: "row", marginTop: 40 }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={() => {
                                ubah()
                                toggleModal3()
                            }} title="Ubah" titleStyle={[style.nunitosans, { textAlign: "center", color: "#E3DB69" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={toggleModal3} title="Batal" titleStyle={[style.nunitosans, { textAlign: "center", color: "black" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal isVisible={isModalVisible2}
                onBackdropPress={toggleModal2}
                onBackButtonPress={toggleModal2}>
                <View style={style.content}>
                    <Text style={[style.nunitosans, { textAlign: "center" }]}>Pilih tindakan untuk mengubah pesan</Text>
                    <View style={{ flexDirection: "row", marginTop: 40 }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={() => {
                                hapus()
                                toggleModal2()
                            }} title="Hapus" titleStyle={[style.nunitosans, { textAlign: "center", color: "red" }]} buttonStyle={{ backgroundColor: "white" }}></Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={() => {
                                toggleModal3()
                                toggleModal2()
                            }} title="Ubah" titleStyle={[style.nunitosans, { textAlign: "center", color: "#E3DB69" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={toggleModal2} title="Batal" titleStyle={[style.nunitosans, { textAlign: "center", color: "black" }]} buttonStyle={{ backgroundColor: "white" }}>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={{ flex: 1 }}>
                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={handleScrollTo}
                >

                    <View style={{ padding: 3 }}>
                        {data.map((item) => item.text ? (<View>
                            {item.sender != 'Bot' ? (
                                <View style={{ alignItems: "flex-end", marginRight: 15, marginLeft: 60 }}>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end", flexDirection: "row" }}>
                                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                                            {item.is_read == 1 ? (<Text style={[style.nunitosans, { fontSize: 10, marginRight: 10, color: "gray" }]}>Read</Text>) : (null)}
                                            <View style={{ backgroundColor: '#B6DAFC', padding: 14, borderRadius: 25 }}>
                                                <Text style={[style.poppinsmedium, { fontSize: 14 }]}>{item.text}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ) : (
                                <View style={{ alignItems: "flex-start", marginTop: 15, marginLeft: 15 }}>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", flexDirection: "row" }}>
                                        <View style={{ marginTop: 30 }}>
                                            <Image
                                                source={require("../assets/image/d-removebg-preview.png")}
                                                style={{ width: 50, height: 50, marginRight: 10 }}
                                                resizeMode="contain"
                                            />
                                        </View>
                                        <View>
                                            <Text style={[style.nunitosans, { fontSize: 14, marginLeft: 11 }]}>{item.sender}</Text>
                                            <View style={{ backgroundColor: "#EFF3F7", padding: 14, borderRadius: 25, marginTop: 10, maxWidth: DEVICE_WIDTH * 0.7 }}>
                                                <Text style={[style.poppinsmedium, { fontSize: 14 }]}>{item.text}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}



                        </View>) : (null))}

                    </View>

                </ScrollView>
                <View style={[{ justifyContent: "center", alignItems: "center", marginTop: 10, flex: 0, height: 75, backgroundColor: "white", elevation: 10, padding: 10, flexDirection: "row" }]} >
                    <View style={{ flex: 1 }}>
                        <TextInput onChangeText={setisi} value={isi} multiline={true} placeholder="Type your message..."></TextInput>
                    </View>
                    <TouchableOpacity onPress={chat}>
                        <View style={{ marginRight: 20 }}>
                            <FontAwesomeIcon icon={faPaperPlane} size={22} color={colors.button}></FontAwesomeIcon>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

export default Chat;
