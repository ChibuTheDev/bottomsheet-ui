import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Switch, Text, View } from 'react-native';
import "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const bottomModalRef = useRef(null);

  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = ['25%', '48%', '70%']; // How much of the screen we want the sheet to take

  function handlePresentModal() {
    bottomModalRef.current?.present();  
    setTimeout(() => { 
      setIsOpen(true);
    }, 150);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={[styles.container, { backgroundColor: isOpen ? 'gray' : 'white' }]}> {/* How conditional styles work in React native*/}
          <Button title='Present Modal' onPress={handlePresentModal} />
          <StatusBar style="auto" />
          <BottomSheetModal
            ref={bottomModalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={[styles.shadow,{ borderRadius: 30 }]}
            onDismiss={() => setIsOpen(false)} 
            viewStyle={styles.shadow}
          >
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Hello World</Text>

              <View style={styles.row}>
                <Text>Dark Mode</Text>
                <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
              </View>

            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer:{
    flex:1,
    alignItems:'center',
    paddingHorizontal:15,
  },
  title:{
    fontWeight: '900',
    fontSize:16,
    letterSpacing:0.5,
    marginBottom:20
  },

  row:{
    width:'100%',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
  },

  subtitle:{
    color:'#101318',
    fontSize:14,
    fontWeight: 'bold'
  },

  shadow:{
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.6,
shadowRadius: 10.32,

elevation: 18,
  }


});
