import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedData:'',
      buttonState:"normal"
    }
  }
  getCameraPermissions=async()=>{
    var {status}=Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions:status==="granted"
    })
  }
  handleBarCodeScanned=({type,data})=>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:"normal"
    })
  }
    render() {
      const hasCameraPermissions=this.state.hasCameraPermissions
      const scanned=this.state.scanned
      const buttonState=this.state.buttonState
      if (buttonState==="clicked"&&hasCameraPermissions){
          return(
            <BarCodeScanner
            onBarCodeScanner={scanned?undefined:this.handleBarCodeScanned}
            />
          )
      }
      else if(buttonState==="normal"){
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>
              {hasCameraPermissions===true?this.state.scannedData:"Request for Camera Permission"}
            </Text>
            <TouchableOpacity
            onpress={this.getCameraPermissions}>
              
              <Text>
                scan qr code
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
      
    }
  }