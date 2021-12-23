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
