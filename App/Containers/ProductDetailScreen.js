import * as React from 'react';
import { View, Image, TouchableOpacity, Dimensions, Text, ScrollView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { cStyles, DeviceUtils } from '../Utils';
import { IconBack, Star, IconLove, IconUnLove, IconBackRight, IconSizeProduct, IconClose, IconAdd, IconMinus, ButtonBuyCart } from "../SVG";
import { TextMask } from 'react-native-masked-text';
import Modal from 'react-native-modal';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});


const infoProductTemple = {
    discount: 10,
    price_sale: 406000,
    price: 441000,
    isSale: true,
    name: "Solid Pocket Button Lapel Long Sleeve Blue Cotton 100%",
    rating: 4,
    numberRating: 996,
    sold: 1201,
    image: ["https://picsum.photos/400/400", "https://picsum.photos/400/400", "https://picsum.photos/400/400"],
    isVariant: true,
    color: [
        {
            name: "Đen",
            isSoldOut: false,
            _id: "hagsfd9712"
        },
        {
            name: "Trắng",
            isSoldOut: true,
            _id: "kyasd786"
        },
        {
            name: "Xanh",
            isSoldOut: false,
            _id: "asdhgas7567"
        },
    ],
    size: [
        {
            name: "S",
            isSoldOut: false,
            _id: "KAJSJDY967"
        },
        {
            name: "M",
            isSoldOut: false,
            _id: "NASF76567AS"
        },
        {
            name: "L",
            isSoldOut: false,
            _id: "0967HFRW445"
        },
        {
            name: "XL",
            isSoldOut: false,
            _id: "AHSFGDGA5345"
        },
        {
            name: "2XL",
            isSoldOut: false,
            _id: "1275GHFGASA"
        }
    ],
    isFavorite: true

}

const { width, height } = Dimensions.get('window');

export const ImageDetailProduct = (props) => {

    const { data } = props;
    const [activeImageIndex, setActiveImageIndex] = React.useState(1);

    const onSnapToItem = (index) => {
        setActiveImageIndex(index + 1)
    }

    const renderItem = ({ item, index }) => {
        return (
            <Image
                style={styles.image}
                source={{
                    uri: item,
                    // timeCache: 4  
                }}
                resizeMode={"cover"}

            />


        )
    }
    return (
        <View style={styles.containerCarouselImage}>
            <Carousel
                data={data}
                scrollEnabled={data.length > 1}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={width}
                onSnapToItem={onSnapToItem}
                firstItem={activeImageIndex - 1}
            />
            <View style={styles.viewPag}>
                <Text style={styles.textPag}>{`${activeImageIndex}/${data.length}`}</Text>
            </View>
            <TouchableOpacity style={styles.buttonBack} activeOpacity={.7}>
                <IconBack size={cStyles.size14}/>
            </TouchableOpacity>
        </View>
    )
}

export const TextMoney = (props) => {
    const { value, delimiter, style, suffix, customOpt, prefix } = props;
    return (
        <Text numberOfLines={1} style={style}>
            {prefix ? (prefix == "-" && prefix || prefix + ' ') : null}
            <TextMask
                value={value} type={'money'}
                options={customOpt || { delimiter: delimiter || '.', precision: 0, unit: '', separator: ' ' }}
            />
            {suffix ? '' + suffix : null}
        </Text>
    )
}

export const Rating = (props) => {
    const { numberRating } = props;
    const data = [1, 2, 3, 4, 5];

    return (
        <View
            style={{ flexDirection: "row", }}>
            {
                data.map((item, index) => {
                    if (index < numberRating) {
                        return <Star size={cStyles.size14} />
                    }
                    return null
                })
            }
        </View>
    )
}

export const ButtonFavorite = (props) => {
    const { isFavorite } = props;

    if (isFavorite) {
        return (
            <TouchableOpacity style={[styles.buttonFavorite, props?.styles]}>
                <IconLove size={cStyles.size20} />
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity style={[{
            ...cStyles.center
        }, props?.styles]}>
            <IconUnLove size={cStyles.size20} />
        </TouchableOpacity>
    )
}

export const DetailItemVariant = (props) => {
    const { dataVariant, title, listVariantChoose, onPressChoose } = props;
    return (
        <View>
            <Text style={styles.textTitle}>{title}</Text>
            <View style={styles.containerItemVariant}>
                {
                    dataVariant.map((item, index) => {
                        var font = { ...cStyles.fontInterRegular_14, color: item?.isSoldOut && "#4E5369" || "#3A3F55" }
                        if (listVariantChoose.includes(item)) {
                            font = {
                                ...cStyles.fontInterBold_14,
                                color: item?.isSoldOut && "#4E5369" || "#0F172A"
                            }
                        }
                        return (
                            <TouchableOpacity style={[ {
                            
                                borderWidth: 1,
                                paddingHorizontal: 16,
                                paddingVertical: 9,
                                borderColor: item?.isSoldOut && "#D3D3E1" || listVariantChoose.includes(item) && "#0F172A" || "#D3D3E1",
                                marginLeft: index != 0 && 8 || 0,

                            }]}
                                disabled={item?.isSoldOut}
                                activeOpacity={.8}
                                onPress={() => { onPressChoose(item) }}
                            >
                                <Text style={{
                                    opacity: item?.isSoldOut && .4 || 1,
                                    ...font
                                }}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )

}

const ProductDetailScreen = () => {
    // ****************** Init State, props ***********

    const [infoProduct, setInfoProduct] = React.useState(infoProductTemple)
    const [isOpenModalVariant, setIsOpenModalVariant] = React.useState(false)
    const [listChooseColor, setListChooseColor] = React.useState([])
    const [listChooseSize, setListChooseSize] = React.useState([])
    const [quantityChoose, setQuantityChoose] = React.useState(0);

    /// ****************** Process Life Cycle *********

    // ******************* Process Func Child *********
    const onPressModal = React.useCallback(() => {
        setIsOpenModalVariant(true)
    }, [isOpenModalVariant])

    const onCloseModal = React.useCallback(() => {
        setIsOpenModalVariant(false)
    }, [isOpenModalVariant])

    const onPressChooseColor = React.useCallback((item) => {
        if (!listChooseColor.includes(item)) {
            setListChooseColor([...listChooseColor, item])
        } else {
            if (listChooseColor.length > 0) {
                var temp = listChooseColor.filter((value) => { return value?._id != item?._id });
                setListChooseColor([...temp])
            }
        }
    }, [listChooseColor, infoProduct])

    const onPressChooseSize = React.useCallback((item) => {
        if (!listChooseSize.includes(item)) {
            setListChooseSize([...listChooseSize, item])
        } else {
            if (listChooseSize.length > 0) {
                var temp = listChooseSize.filter((value) => { return value?._id != item?._id });
                setListChooseSize([...temp])
            }
        }
    }, [listChooseSize, infoProduct])

    const onPressQuantity = React.useCallback((type) => {
        if (type == "minus") {
            if (quantityChoose > 1) {
                setQuantityChoose(quantityChoose - 1)
                return
            }
        }
        if (type == "add") {
            setQuantityChoose(quantityChoose + 1)
            return
        }
    }, [quantityChoose])

    /// ****************** Render UI Child ***********
    const renderImageProduct = React.useMemo(() => {
        return (
            <View style={styles.containerImage}>
                <ImageDetailProduct data={infoProduct.image} />
            </View>
        )
    }, [infoProduct])

    const renderNameProduct = React.useMemo(() => {
        return (
            <View style={styles.containerName}>
                <View style={styles.containerViewDiscount}>
                    <View style={styles.viewDiscount} >

                        <Text style={styles.textDiscount}>{`${infoProduct.discount}%`}</Text>

                    </View>
                    <TextMoney style={styles.textMoney} value={infoProduct.price_sale} suffix={'đ'} delimiter={'.'} />
                    <TextMoney style={styles.textThroughLine} value={infoProduct.price_sale} suffix={'đ'} delimiter={'.'} />
                </View>

                <Text style={styles.textName}
                    numberOfLines={2}>{infoProduct.name}</Text>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.viewRating}>
                        <Rating numberRating={infoProduct.rating} />
                        <Text style={styles.textRating1}>{`${infoProduct.numberRating}`}</Text>
                        <View style={styles.dot} />
                        <Text style={styles.textSold}>{` Đã bán ${infoProduct.sold}`}</Text>
                    </View>
                    <ButtonFavorite isFavorite={infoProduct.isFavorite} style={{
                        // position:"absolute",
                        // right: 8
                    }} />
                </View>
            </View>
        )
    }, [infoProduct])

    const renderLine = (height) => {
        return (
            <View style={{ width: width, height: height ||1, backgroundColor: "#EEEDF5" }} />
        )
    }

    const renderButtonSize = React.useMemo(() => {
        return (
            <TouchableOpacity style={styles.viewButtonVariant}
                activeOpacity={.7}
                onPress={onPressModal}
            >
                <View style={styles.buttonVariant}>
                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                        <IconSizeProduct size={cStyles.size21} />
                        <Text style={styles.textTitleButtonVariant}>{"Màu, Kích thước"}</Text>
                    </View>
                    <IconBackRight size={cStyles.size9} />
                </View>
            </TouchableOpacity>
        )
    }, [infoProduct, isOpenModalVariant])

    const renderModalVariant = React.useMemo(() => {
        return (
            <Modal
                isVisible={isOpenModalVariant}
                deviceWidth={width}
                deviceHeight={height}
                avoidKeyboard={true}
                style={{ margin: 0, justifyContent: 'flex-end' }}
                onBackdropPress={onCloseModal}
                onBackButtonPress={onCloseModal}
                onSwipeComplete={onCloseModal}
                swipeDirection={'down'}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                backdropColor={"#0F172A80"}
                backdropOpacity={.5}
                backdropTransitionOutTiming={500}
                backdropTransitionInTiming={500}
                animationOutTiming={500}
                animationInTiming={500}
            >
                <View style={styles.containerModal}>
                    {/*render Header*/}
                    <View style={styles.viewTextHeaderModal}>
                        <Text style={{ ...cStyles.fontInterBold_16, color: "#0F172A", flex: 1 }}>{"Chọn phân loại"}</Text>
                        <TouchableOpacity activeOpacity={.7} onPress={onCloseModal} style={styles.buttonCloseModal}>
                            <IconClose size={cStyles.size11} />
                        </TouchableOpacity>
                    </View>
                    {renderLine( width > 375 ? 1.5 : 1)}
                    {/*render Content*/}
                    <View style={styles.viewItemVariant}>
                        <DetailItemVariant
                            title={"MÀU SẮC"}
                            dataVariant={infoProduct.color}
                            onPressChoose={onPressChooseColor}
                            listVariantChoose={listChooseColor}
                        />
                        <DetailItemVariant
                            title={"KÍCH THƯỚC"}
                            dataVariant={infoProduct.size}
                            onPressChoose={onPressChooseSize}
                            listVariantChoose={listChooseSize}
                        />
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <Text style={{ ...cStyles.fontInterMedium_12, color: "#0F172A", flex: 1 }}>{"SỐ LƯỢNG"}</Text>
                            <View style={{
                                flexDirection: "row",

                            }}>

                                <TouchableOpacity
                                    style={styles.buttonAddCart}
                                    activeOpacity={.7}
                                    onPress={() => { onPressQuantity("minus") }}
                                >
                                    <IconMinus size={cStyles.size14} />
                                </TouchableOpacity>
                                <View style={styles.viewTextQuantity}
                                >
                                    <Text style={{
                                        ...cStyles.fontInterMedium_14,
                                        color: "#0F172A"
                                    }}>{quantityChoose}</Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.buttonAddCart}
                                    activeOpacity={.7}
                                    onPress={() => { onPressQuantity("add") }}
                                >
                                    <IconAdd size={cStyles.size24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/*render Button Bottom*/}
                    <View style={styles.containerButtonBuy}>
                        <TouchableOpacity
                            style={styles.buttonLikeInBuy}
                        >
                            <IconUnLove size={cStyles.size20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonAddCartBottom}
                            activeOpacity={.7}
                        >
                            {/* <ButtonBuyCart size={288} /> */}
                            <Text style={styles.textBuy}>{"THÊM VÀO GIỎ HÀNG"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )

    }, [infoProduct, isOpenModalVariant, listChooseColor, listChooseSize, quantityChoose])


    const renderInfoProduct = React.useMemo(() => {
        return (
            <ScrollView bounces={false}>
                {renderImageProduct}
                {renderNameProduct}
                {renderButtonSize}
            </ScrollView>
        )
    }, [infoProduct, isOpenModalVariant])


    // ************** RENDER Parent UI *******************
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {renderInfoProduct}
            {renderModalVariant}
        </View>
    )
}

export default ProductDetailScreen;

const styles = EStyleSheet.create({
    containerImage: {
        width: "100%",
        height: parseInt(1.026 * width),
        backgroundColor: "#fff"
    },
    containerName: {
        paddingVertical: "5.3%",
        paddingHorizontal: "4.2%",
        backgroundColor: "#fff"
    },
    image: {
        width: "100%",
        height: parseInt(1.026 * width),
    },
    containerCarouselImage: {
        flex: 1,
        width: "100%",
        height: parseInt(1.026 * width),
    },
    viewPag: {
        width: 44,
        height: 22,
        borderRadius: 11,
        position: "absolute",
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        bottom: 18,
        left: width / 2 - 44 / 2,
        justifyContent: "center",
        alignItems: "center"
    },
    textPag: {
        ...cStyles.fontInterMedium_12,
        color: "#fff"
    },
    buttonFavorite: {
        justifyContent: "center",
        alignItems: "center",
        width: "32rem",
        height: "32rem",
        borderRadius: "16rem",
        backgroundColor: "#FDCC0B"
    },
    textTitle: {
        ...cStyles.fontInterMedium_12,
        color: "#0F172A"
    },
    containerItemVariant: {
        flexDirection: "row",
        paddingVertical: "12rem",
        paddingBottom:DeviceUtils.isIphoneX() &&  "24rem" || "12rem"
    },
    viewDiscount: {
        width: "40rem",
        height: "24rem",
        backgroundColor: "#FF4141",
        borderTopLeftRadius: "8rem",
        borderTopRightRadius: "1rem",
        borderBottomRightRadius: "8rem",
        borderBottomLeftRadius: "1rem",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonVariant: {
        paddingHorizontal: "16rem",
        paddingVertical: "9rem",
        borderWidth: DeviceUtils.isIphoneX() && "1rem" || "2rem",
    },
    containerViewDiscount: {
        flexDirection: "row",
        alignItems: "center"
    },
    textDiscount: {
        ...cStyles.fontInterBold_12,
        color: "#fff"
    },
    textMoney: {
        ...cStyles.fontInterBold_16,
        color: '#0F172A',
        paddingLeft: 12,
    },
    textThroughLine: {
        ...cStyles.fontInterRegular_12,
        color: '#9CA1B8',
        paddingLeft: "8rem",
        paddingTop: "4rem",
        textDecorationLine: 'line-through'
    },
    textName: {
        ...cStyles.fontInterRegular_16,
        color: "#3A3F55",
        paddingVertical: "12rem"
    },
    viewRating: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    containerModal: {
        width: width,
        height: height / 2,
        backgroundColor: "#fff",
        // paddingBottom: DeviceUtils.isIphoneX() && 12 || 0,
        paddingBottom: "12rem",
    },
    viewButtonVariant: {
        width: width,
        height: "81rem",
        backgroundColor: "#F7F6FA",
        paddingHorizontal: "16rem",
        paddingVertical: "12rem",
        justifyContent: "center"
    },
    buttonVariant: {
        paddingHorizontal: "14rem",
        paddingVertical: "19rem",
        backgroundColor: "#fff",
        borderRadius: "8rem",
        alignItems: "center",
        flexDirection: "row"
    },
    textTitleButtonVariant: {
        ...cStyles.fontInterMedium_14,
        color: "#0F172A",
        paddingLeft: "12rem"
    },
    buttonCloseModal: {
        justifyContent: "center",
        alignItems: "center",
        width: "20rem",
        height: "20rem",
        backgroundColor: "transparent"
    },
    viewTextHeaderModal: {
        flexDirection: "row",
        paddingVertical: "12rem",
        paddingHorizontal: "16rem",
    },
    viewItemVariant: {
        flex: 1,
        paddingHorizontal: "16rem",
        paddingVertical: "16rem"
    },
    buttonAddCart: {
        width: "56rem",
        height: "40rem",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F6FA"
    },
    viewTextQuantity: {
        marginHorizontal: "8rem",
        padding: "9rem",
        justifyContent: "center",
        alignItems: "center",
        width: "50rem",
        height: "40rem",
        borderColor: "#F7F6FA",
        borderWidth:  DeviceUtils.isIphoneX() && "1rem" || "2rem",
    },
    containerButtonBuy: {
        width: width,
        height: "86rem",
        position: "absolute",
        bottom: DeviceUtils.isIphoneX() && "12rem" || "0rem",
        left: 0,
        paddingHorizontal: "16rem",
        backgroundColor: "#ffff",

        shadowColor: "#0F011771",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 3.84,

        flexDirection: "row",
        alignItems: "center"
    },
    buttonLikeInBuy: {
        width: "43rem",
        height: "43rem",
        borderRadius: "21,5rem",
        marginRight: "10rem",
        paddingTop: "3rem",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EEEDF5"
    },
    dot: {
        width: "4rem", 
        height: "4rem", 
        borderRadius: "2rem",
         backgroundColor: "#6C728B",
          opacity: .6
    },
    textRating1: {
        ...cStyles.fontInterRegular_12, 
        color: "#6C728B",
         paddingLeft: "8rem", 
         paddingRight: "4rem"
    },
    textSold:{
        ...cStyles.fontInterRegular_12,
         color: "#6C728B", 
         paddingLeft: "4rem", 
         paddingRight: "8rem"
    },
    buttonAddCartBottom:{
        width: "288rem",
        height:"53rem",
        marginLeft: "4rem",
        backgroundColor: "#0F172A",
        ...cStyles.center,
    },
    textBuy: {
        ...cStyles.fontInterBold_12,
        color:"#fff"
    },
    buttonBack:{
        ...cStyles.center,
        width: "33rem",
        height: "33rem",
        borderRadius: "16.5rem",
        backgroundColor:"#fff",
        position:"absolute",
        left: "16rem",
        top:"55rem"
    }
})