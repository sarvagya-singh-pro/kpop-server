import React, { useRef,useEffect ,useState} from 'react';
import { View, Text, StyleSheet,ImageBackground, FlatList, Dimensions } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue, withSpring } from 'react-native-reanimated';

// Sample data for multiple banners
const songs = [
    {
      id: '1',
      title: 'DNA',
      artist: 'BTS',
      color: 'rgba(60, 110, 70, 0.2)',
      image: 'https://variety.com/wp-content/uploads/2021/06/BTS-Hyundai-ad.png?w=1000&h=667&crop=1',
      officialWebsite: 'https://ibighit.com/'
    },
    {
      id: '2',
      artist: 'TWICE',
      color: 'rgba(235, 64, 52, 0.2)',
      image: 'https://www.kpop.ae/cdn/shop/collections/twice.png?v=1677653469',
      officialWebsite: 'https://twice.jype.com/'
    },
    {
      id: '3',
      title: 'No Other',
      artist: 'Super Junior',
      color: 'rgba(0, 0, 0, 0.5)',
      image: 'https://cdn.shopify.com/s/files/1/0469/3927/5428/t/21/assets/1fc6ceb85ae50f0813fe8ff4fafd8248--edited-1675349191316.jpg?v=1675349195',
      officialWebsite: 'https://superjunior.smtown.com/'
    },
    {
      id: '4',
      title: 'Gangnam Style',
      artist: 'PSY',
      color: 'rgba(135, 109, 86, 0.2)',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdFgg_u68q9MBm3cD-Qi8lSCuMpprPNlcRLw&s',
      officialWebsite: 'https://www.psypark.com/'
    },
    {
      id: '5',
      artist: 'Blackpink',
      color: 'rgba(48, 7, 54, 0.2)',
      image: 'https://imageio.forbes.com/specials-images/imageserve/5fe254e338619733dfcc6b10/2019-Getty-Entertainment---Social-Ready-Content/960x0.jpg?format=jpg&width=960',
      officialWebsite: 'https://www.blackpinkofficial.com/'
    },
    {
      id: '6',
      artist: 'Ateez',
      color: 'rgba(255, 99, 71, 0.2)',
      image: 'https://preview.redd.it/ateez-difference-v0-dgrodun2s7xb1.jpg?width=640&crop=smart&auto=webp&s=012f65abede5d6152eee71e1f66b6d93bfaafd2f',
      officialWebsite: 'https://ateez.kqent.com/'
    },
    {
      id: '7',
      artist: 'Babymonster',
      color: 'rgba(123, 104, 238, 0.2)',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoO92Cb2z3jKtaQ7AYmCTmw5sEl1g2tVSqIA&s',
      officialWebsite: 'https://yg-babymonster.com'
    },
    {
      id: '8',
      artist: 'Riize',
      color: 'rgba(255, 215, 0, 0.2)',
      image: 'https://6.soompi.io/wp-content/uploads/image/20250121180150_RIIZE.jpg?s=900x600&e=t',
      officialWebsite: 'https://www.smentertainment.com/artist/riize'
    },
    {
      id: '9',
      artist: 'The Boyz',
      color: 'rgba(0, 191, 255, 0.2)',
      image: 'https://1.vikiplatform.com/pr/22074pr/1311b88244.jpg?x=b',
      officialWebsite: 'https://www.theboyz.kr'
    },
    {
      id: '10',
      artist: 'Stray Kids',
      color: 'rgba(220, 20, 60, 0.2)',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVvpaGifwOxq6UcHk6Ezv6-l8974qAl4erTA&s',
      officialWebsite: 'https://straykids.jype.com/'
    },
    {
      id: '11',
      artist: 'Itzy',
      color: 'rgba(0, 255, 127, 0.2)',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2OpTZj6dN3x4jetzcPCQ3gqGBUmB28VgKRw&s',
      officialWebsite: 'https://itzy.jype.com/'
    },
    {
      id: '12',
      artist: 'BTOB',
      color: 'rgba(65, 105, 225, 0.2)',
      image: 'https://www.hindustantimes.com/ht-img/img/2024/01/29/1600x900/btob_members_1706527232972_1706527291983.jfif',
      officialWebsite: 'https://btobofficial.com/'
    },
    {
      id: '13',
      artist: 'INFINITE',
      color: 'rgba(255, 69, 0, 0.2)',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-StWL-laM80ibN6y5ojThjyh_nyI5u6otvw&s',
      officialWebsite: 'https://ifnt-7.com/'
    },
    {
      id: '14',
      artist: 'VIXX',
      color: 'rgba(75, 0, 130, 0.2)',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRluLIUbrHjUAgRjsKydw8b2e78AzxSShW8yw&s',
      officialWebsite: 'https://vixx.cjenm.com/'
    },
    {
      id: '15',
      artist: 'Oh My Girl',
      color: 'rgba(255, 20, 147, 0.2)',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Oh_My_Girl_at_an_Inkigayo_fanmeeting.jpg',
      officialWebsite: 'https://ohmygirlofficial.com/'
    },
    {
      id: '16',
      artist: 'GOT the beat',
      color: 'rgba(255, 140, 0, 0.2)',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXEN1iVx_tZknm8mVCGcUsSEp6FnfamJxYrQ&s',
      officialWebsite: 'https://www.smtown.com/'
    },
    {
      id: '17',
      artist: 'CIX',
      color: 'rgba(0, 255, 255, 0.2)',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1YmWWZKU_naC0SaIc2ciJRoECvJtgnuQ09A&s',
      officialWebsite: 'https://c9ent.co.kr/cix'
    }
  ];
  

const { width } = Dimensions.get('window'); // Screen width

const BannerSlider = () => {
  const flatListRef = useRef(null); // Reference to the FlatList
  const translateX = useSharedValue(0); // Tracks the scroll position
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex < songs.length - 1) {
        setActiveIndex(activeIndex + 1);
        flatListRef.current.scrollToIndex({ index: activeIndex + 1 });
      } else {
        setActiveIndex(0);
        flatListRef.current.scrollToIndex({ index: 0 });
      }
    }, 3000); // Switch every 3 seconds
  
    return () => clearInterval(interval);
  }, [activeIndex]);
  // Gesture handler for swipe gestures
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (event) => {
      const snapThreshold = width * 0.2; // Threshold for snapping to the next/previous banner
      const currentIndex = Math.round(translateX.value / width);
      const shouldSnapLeft = event.velocityX > 0 || translateX.value < -currentIndex * width - snapThreshold;
      const shouldSnapRight = event.velocityX < 0 || translateX.value > -currentIndex * width + snapThreshold;

      if (shouldSnapLeft) {
        translateX.value = withSpring(-currentIndex * width); // Snap to the left
      } else if (shouldSnapRight) {
        translateX.value = withSpring(-(currentIndex - 1) * width); // Snap to the right
      } else {
        translateX.value = withSpring(-currentIndex * width); // Stay in place
      }

      // Scroll the FlatList programmatically
      flatListRef.current.scrollToOffset({
        offset: -translateX.value,
        animated: true,
      });
    },
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.gestureContainer}>
          {/* Horizontal FlatList for multiple banners */}
          <FlatList
            ref={flatListRef}
            data={songs}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={[styles.banner]}>
                    <ImageBackground style={{width:'100%', overflow:'hidden' ,borderRadius:30,height:'100%',flex:1,justifyContent:'center',alignItems:'center'}} src={item.image}>
                    <View style={[styles.shadowOverlay,{backgroundColor:item.color}]}>
                <Text style={styles.title}>{item.artist}</Text>
                </View>
                </ImageBackground>
              </View>
            )}
          />
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius:30,
  },
  gestureContainer: {
    flex: 1,
    width: '100%',

    borderRadius:30,
  },  shadowOverlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire ImageBackground
    backgroundColor: 'rgba(60, 110, 70,0.5)', // Semi-transparent black overlay
    justifyContent: 'center',
    color:"#fff",
    borderRadius:30,
    alignItems: 'center',
  },
  banner: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    width:width*0.9,
    marginTop:50,
    marginHorizontal: 10,
    borderRadius: 30,
    marginBottom:30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  artist: {
    fontSize: 16,
    color: '#eee',
  },
});

export default BannerSlider;