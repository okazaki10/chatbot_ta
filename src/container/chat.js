import React, { createRef, useEffect, useRef, useState } from 'react';
import { View, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, StatusBar, Linking } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';

import { colors } from '../globalstyles';

import style from '../globalstyles';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import { TextInput } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import HyperLink from 'react-native-hyperlink';
function Chat(props) {
    const { width: DEVICE_WIDTH } = Dimensions.get('window');

    const [isi, setisi] = useState("")
    const [data, setdata] = useState([{ text: 'Halo, perkenalkan aku bot, ceritakan tentang keluhan mu se detail mungkin', id: 1, sender: 'Bot' }])
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
                        var tagstr = tag.substring(4)
                        var akurasi = json.data[0].accuracy
                        console.log(tagstr)
                        var data2 = [...data]

                        //menampilkan tag dan confidence yang didapatkan dari sistem backend
                        var text = "tag : " + tag + "\nconfidence : " + akurasi + "\n________________________"

                        //menginisiasi pesan
                        var pesan = ""
                        pesan = pesan + "\n\n"

                        //bot akan memberitahu pengguna bahwa pengguna memiliki gejala bipolar jika tag yang diprediksi adalah tag_bipolar
                        if (tag == "tag_bipolar") {
                            pesan = pesan + "Sepertinya keluhan yang kamu alami bukanlah depresi melainkan bipolar"
                            pesan = pesan + "\n\nNamun, diagnosis yang disebutkan sebelumnya belum tentu tepat dikarenakan dokter perlu melakukan pemeriksaan secara langsung kepada anda untuk menilai kondisi anda saat ini. Maka dari itu, sebaiknya anda segera berkonsultasi secara langsung dengan dokter psikiater untuk dilakukan pemeriksaan lebih lanjut terhadap kondisi anda. Setelah pemeriksaan, nantinya dokter akan dapat menentukan diagnosis dan penanganan yang tepat seperti dengan psikoterapi atau pemberian obat-obatan tertentu jika memang diperlukan."
                        //bot akan memberikan pesan tentang gejala depresi secara lengkap beserta sarannya jika tag yang diprediksi adalah tag_depresi
                        } else if (tag == "tag_depresi") {
                            pesan = pesan + "Keluhan yang kamu alami kemungkinan termasuk ke dalam depresi dimana terjadi perubahan suasana hati atau perasaan sedih, putus harapan, dan tidak berharga yang terjadi selama minimal 2 minggu. Depresi yang tidak ditangani dapat menyebabkan penurunan produktifitas kerja, gangguan hubungan sosial, hingga munculnya keinginan untuk bunuh diri seperti yang anda alami saat ini.\n\nDepresi ditandai dengan gejala kecemasan dan kekhawatiran berlebih, dibebani rasa bersalah dan menyalahkan diri sendiri, suasana hati buruk dan sedih berkelanjutan, mudah marah atau menangis, menjadi apatis terhadap lingkungan sekitar, emosional tidak stabil, merasa putus asa atau frustasi, dan selalu merasa lelah dan tidak berharga. Keluhan fisik yang dapat muncul adalah seperti kelelahan dan hilang tenaga, selera makan menurun atau hilang, insomnia ataupun terlalu banyak tidur, merasakan pusing atau nyeri tanpa sebab yang jelas, tidak ada gairah seksual, dan berat badan yang naik ataupun turun secara drastis.\n\nDepresi dapat disebabkan oleh peristiwa traumatis atau tekanan batin sebelumnya, memiliki penyakit kronis, memiliki kepribadian tertentu seperti rendah diri atau pesimis, ketergantungan alkohol/narkoba, riwayat gangguan mental sebelumnya seperti gangguan kecemasan, konsumsi obat rutin tertentu seperti obat tidur atau obat hipertensi, dan memiliki riwayat keluarga dengan penyakit depresi."
                            pesan = pesan + "\n\nNamun, diagnosis yang disebutkan sebelumnya belum tentu tepat dikarenakan dokter perlu melakukan pemeriksaan secara langsung kepada anda untuk menilai kondisi anda saat ini. Maka dari itu, sebaiknya anda segera berkonsultasi secara langsung dengan dokter psikiater untuk dilakukan pemeriksaan lebih lanjut terhadap kondisi anda. Setelah pemeriksaan, nantinya dokter akan dapat menentukan diagnosis dan penanganan yang tepat seperti dengan psikoterapi atau pemberian obat-obatan tertentu jika memang diperlukan."
                            pesan = pesan + "\n\nSementara ini anda dapat melakukan beberapa hal untuk mencegah kondisi anda menjadi memburuk, seperti melakukan relaksasi untuk mengatasi stres (yoga atau pilates), tidur yang cukup minimal 8 jam per hari, hindari konsumsi alkohol, olahraga teratur, berbagi perasaan anda dengan seseorang yang dipercaya, membatasi penggunaan sosial media jika dirasa mengganggu, serta menjauhi orang yang membawa pengaruh buruk."
                        //bot akan memberitahu pengguna bahwa pengguna memiliki gejala insomnia jika tag yang diprediksi adalah tag_insomnia
                        } else if (tag == "tag_insomnia") {
                            pesan = pesan + "Sepertinya keluhan yang kamu alami bukanlah depresi melainkan insomnia"
                            pesan = pesan + "\n\nNamun, diagnosis yang disebutkan sebelumnya belum tentu tepat dikarenakan dokter perlu melakukan pemeriksaan secara langsung kepada anda untuk menilai kondisi anda saat ini. Maka dari itu, sebaiknya anda segera berkonsultasi secara langsung dengan dokter psikiater untuk dilakukan pemeriksaan lebih lanjut terhadap kondisi anda. Setelah pemeriksaan, nantinya dokter akan dapat menentukan diagnosis dan penanganan yang tepat seperti dengan psikoterapi atau pemberian obat-obatan tertentu jika memang diperlukan."
                        //bot akan memberitahu pengguna bahwa pengguna memiliki gejala kecemasan jika tag yang diprediksi adalah tag_kecemasan
                        } else if (tag == "tag_kecemasan") {
                            pesan = pesan + "Sepertinya keluhan yang kamu alami bukanlah depresi melainkan kecemasan"
                            pesan = pesan + "\n\nNamun, diagnosis yang disebutkan sebelumnya belum tentu tepat dikarenakan dokter perlu melakukan pemeriksaan secara langsung kepada anda untuk menilai kondisi anda saat ini. Maka dari itu, sebaiknya anda segera berkonsultasi secara langsung dengan dokter psikiater untuk dilakukan pemeriksaan lebih lanjut terhadap kondisi anda. Setelah pemeriksaan, nantinya dokter akan dapat menentukan diagnosis dan penanganan yang tepat seperti dengan psikoterapi atau pemberian obat-obatan tertentu jika memang diperlukan."
                        //bot akan memberitahu pengguna bahwa pengguna memiliki gejala skizofrenia jika tag yang diprediksi adalah tag_skizofrenia
                        } else if (tag == "tag_skizofrenia") {
                            pesan = pesan + "Sepertinya keluhan yang kamu alami bukanlah depresi melainkan skizofrenia"
                            pesan = pesan + "\n\nNamun, diagnosis yang disebutkan sebelumnya belum tentu tepat dikarenakan dokter perlu melakukan pemeriksaan secara langsung kepada anda untuk menilai kondisi anda saat ini. Maka dari itu, sebaiknya anda segera berkonsultasi secara langsung dengan dokter psikiater untuk dilakukan pemeriksaan lebih lanjut terhadap kondisi anda. Setelah pemeriksaan, nantinya dokter akan dapat menentukan diagnosis dan penanganan yang tepat seperti dengan psikoterapi atau pemberian obat-obatan tertentu jika memang diperlukan."
                        }

                        //jika confidence kurang dari 0.5, maka bot akan memberikan pesan yang menyatakan bahwa bot kurang yakin dengan hasil prediksi dan memberikan link yang menuju ke website alodokter
                        if (akurasi < 0.5) {
                            pesan = "\n\naku kurang yakin sama penyakit yang kamu alami, silahkan bertanya kepada dokter jiwa atau psikiater tentang penyakit yang kamu alami dengan mengklik link dibawah ini"
                            pesan = pesan + "\n\nhttps://www.alodokter.com/komunitas/diskusi/penyakit?showtopic=true"
                        }

                        data2.push({ text: text + pesan, id: 2, sender: 'Bot' })
                        setdata(data2)


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



    const scrollViewRef = useRef()
    const handleScrollTo = (w, h) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, y: h })
        }
    };

    return (
        <View style={style.main}>
            <StatusBar backgroundColor={colors.primary} />
       
     

            <View style={{ flex: 1 }}>
                <View style={{ alignItems: "center", justifyContent: "center", height: 50, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}></View>
                    <Text style={{ fontSize: 28, fontWeight: "bold" }}>Chat</Text>

                    <View style={{ flex: 1, alignItems: "flex-end", marginRight: 20 }}>
                        {/*
                        <TouchableOpacity onPress={() => { props.navigation.navigate("Guide") }}>
                            <FontAwesomeIcon icon={faQuestion} size={24} color={colors.primary} />
                        </TouchableOpacity>
                        */}
                    </View>

                </View>
                <View style={[style.line, { marginTop: 0 }]}></View>
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
                                                <HyperLink onPress={(url, text) => Linking.openURL(url)} linkStyle={{ color: '#2980b9' }}>
                                                    <Text style={[style.poppinsmedium, { fontSize: 14 }]}>{item.text}</Text>
                                                </HyperLink>
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
