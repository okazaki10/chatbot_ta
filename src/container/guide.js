import React, { createRef, useEffect, useRef, useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../globalstyles';

import style from '../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane, faQuestion, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TextInput } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
function Guide(props) {
    const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
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
                        data2.push({ text: text + pesan, id: 2, sender: 'Bot' })
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



            <View style={{ flex: 1 }}>
                <View style={{ alignItems: "center", justifyContent: "center", height: 50, flexDirection: "row" }}>
                    <Text style={{ fontSize: 28, fontWeight: "bold" }}>Petunjuk</Text>
                </View>
                <View style={[style.line, { marginTop: 0 }]}></View>
                <ScrollView

                >
                    <View style={{ padding: 22 }}>
                        <Text style={{ fontSize: 16 }}>• Jawablah pertanyaan dari bot dengan mengetikkan 9 keluhan atau hal tentang apa saja yang kamu rasakan selama 2 minggu terakhir</Text>
                        <Text style={{fontSize:16,marginTop:15}}>• Keluhan yang dimaksud adalah seperti</Text>
                        <Text style={{fontSize:16,marginTop:15}}>- "saya tidak pernah merasa kurang berminat atau bergairah dalam melakukan apapun"</Text>
                        <Text style={{fontSize:16,marginTop:15}}>- "Beberapa hari saya merasa kurang berminat atau bergairah dalam melakukan apapun"</Text>
                        <Text style={{fontSize:16,marginTop:15}}>- "seminggu ini saya merasa kurang berminat atau bergairah dalam melakukan apapun"</Text>
                        <Text style={{fontSize:16,marginTop:15}}>- "hampir setiap hari saya merasa kurang berminat atau bergairah dalam melakukan apapun"</Text>
                        <Text style={{fontSize:16,marginTop:15}}>• hal apa saja yang kamu rasakan mengacu kepada pernyataan yang dikeluarkan oleh PHQ-9 yaitu kuesioner depresi yang dikeluarkan oleh WHO seperti gambar dibawah ini</Text>
                    </View>
                    <View>
                        <Image
                            source={require("../assets/image/tabel_kuesioner.jpg")}
                            style={{ width:DEVICE_WIDTH,height:DEVICE_HEIGHT/1.2 }}
                            resizeMode="contain"
                        ></Image>
                    </View>

                </ScrollView>

            </View>

        </View>
    );
};

export default Guide;
