import * as React from 'react';
import { View, Image, TouchableOpacity, Dimensions, Text, ScrollView, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { cStyles, DeviceUtils } from '../Utils';
import { IconBack, Star, IconLove, IconUnLove, IconBackRight, IconSizeProduct, IconClose, IconAdd, IconMinus, ButtonBuyCart } from "../SVG";
import { TextMask } from 'react-native-masked-text';
import Modal from 'react-native-modal';

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
                        return <Star size={14} />
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
                <IconLove size={20} />
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity style={[{
            ...cStyles.center
        }, props?.styles]}>
            <IconUnLove size={20} />
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
                        console.log(item)
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
                                paddingVertical:9,
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
            if (listChooseColor.length > 1) {
                var temp = listChooseColor.filter((value) => { return value?._id != item?._id });
                setListChooseColor([...temp])
            }
        }
    }, [listChooseColor, infoProduct])

    const onPressChooseSize = React.useCallback((item) => {
        if (!listChooseSize.includes(item)) {
            setListChooseSize([...listChooseSize, item])
        } else {
            if (listChooseSize.length > 1) {
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
                        <Text style={{ ...cStyles.fontInterRegular_12, color: "#6C728B", paddingLeft: 8, paddingRight: 4 }}>{`${infoProduct.numberRating}`}</Text>
                        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: "#6C728B", opacity: .6 }} />
                        <Text style={{ ...cStyles.fontInterRegular_12, color: "#6C728B", paddingLeft: 4, paddingRight: 8 }}>{` Đã bán ${infoProduct.sold}`}</Text>
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
            <View style={{ width: width, height: height || 1, backgroundColor: "#EEEDF5" }} />
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
                        <IconSizeProduct size={21} />
                        <Text style={styles.textTitleButtonVariant}>{"Màu, Kích thước"}</Text>
                    </View>
                    <IconBackRight size={9} />
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
                            <IconClose size={11} />
                        </TouchableOpacity>
                    </View>
                    {renderLine(1)}
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
                                    <IconMinus size={14} />
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
                                    <IconAdd size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/*render Button Bottom*/}
                    <View style={styles.containerButtonBuy}>
                        <TouchableOpacity
                            style={styles.buttonLikeInBuy}
                        >
                            <IconUnLove size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ ...cStyles.center }}
                            activeOpacity={.7}
                        >
                            <ButtonBuyCart size={parseInt(width * 0.768)} />
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

const styles = StyleSheet.create({
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
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#FDCC0B"
    },
    textTitle: {
        ...cStyles.fontInterMedium_12,
        color: "#0F172A"
    },
    containerItemVariant: {
        flexDirection: "row",
        paddingVertical: 12,
        paddingBottom:DeviceUtils.isIphoneX() &&  24 || 12
    },
    viewDiscount: {
        width: 40,
        height: 24,
        backgroundColor: "#FF4141",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 1,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonVariant: {
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderWidth: DeviceUtils.isIphoneX() && 1 || 2,
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
        paddingLeft: 8,
        paddingTop: 4,
        textDecorationLine: 'line-through'
    },
    textName: {
        ...cStyles.fontInterRegular_16,
        color: "#3A3F55",
        paddingVertical: 12
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
        paddingBottom: 12,
    },
    viewButtonVariant: {
        width: width,
        height: 81,
        backgroundColor: "#F7F6FA",
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: "center"
    },
    buttonVariant: {
        paddingHorizontal: 14,
        paddingVertical: 19,
        backgroundColor: "#fff",
        borderRadius: 8,
        alignItems: "center",
        flexDirection: "row"
    },
    textTitleButtonVariant: {
        ...cStyles.fontInterMedium_14,
        color: "#0F172A",
        paddingLeft: 12
    },
    buttonCloseModal: {
        justifyContent: "center",
        alignItems: "center",
        width: 20,
        height: 20,
        backgroundColor: "transparent"
    },
    viewTextHeaderModal: {
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    viewItemVariant: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    buttonAddCart: {
        width: 56,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F6FA"
    },
    viewTextQuantity: {
        marginHorizontal: 8,
        padding: 9,
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 40,
        borderColor: "#F7F6FA",
        borderWidth:  DeviceUtils.isIphoneX() && 1 || 2,
    },
    containerButtonBuy: {
        width: width,
        height: 86,
        position: "absolute",
        bottom: DeviceUtils.isIphoneX() && 12 || -20,
        left: 0,
        paddingHorizontal: 16,

        shadowColor: "#0F011771",


        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        elevation: 4,
        flexDirection: "row",
        alignItems: "center"
    },
    buttonLikeInBuy: {
        width: 43,
        height: 43,
        borderRadius: 21.5,
        marginRight: 10,
        paddingTop: 3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EEEDF5"
    }
})