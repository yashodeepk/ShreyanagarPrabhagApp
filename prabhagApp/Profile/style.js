import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    buttonText: {
        color:'#fff',
        fontWeight:'bold',
        fontSize:16,
    },
    buttonTouchableOpacity: {
        height: 65, 
        width : 150, 
        borderRadius: 10,
        elevation:1,
        backgroundColor:"#F7882F",
        justifyContent:'center',
        alignItems:'center',
    },
    buttonView: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 25,
    },
    flexOne:{
        flex:1,
        backgroundColor:'#fff'
    },
    center:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    userImage : {
        margin:10,
        height: 100, 
        width: 100, 
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor:'black',
    },
    detailAddBoxNotEditable: {
        height:100,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'#eee',
        margin:10,
        borderRadius:5,
        flex: 0.9,
        flexDirection:'row',
        padding:10,
    },
    detailAddBoxEditable: {
        height:100,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'#fff',
        margin:10,
        borderRadius:5,
        flex: 0.9,
        flexDirection:'row',
        padding:10,
    },
    editAddIcon: {
        height:100,
        margin:10,
        justifyContent:'center',
        alignItems:'center',
        flex:0.1,
    },
    detailBoxNotEditable : {
        height:55,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'#eee',
        margin:10,
        borderRadius:5,
        alignItems:'center',
        flex: 0.9,
        flexDirection:'row',
        padding:10,
    },
    detailBoxEditable : {
        height:55,
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'#fff',
        margin:10,
        borderRadius:5,
        alignItems:'center',
        flex: 0.9,
        flexDirection:'row',
        padding:10,
    },
    editIcon: {
        height:55,
        margin:10,
        justifyContent:'center',
        alignItems:'center',
        flex:0.1,
    },
    textStyle : {
        fontWeight:'bold',
        fontSize:16,
    },
    alignItemsCenter: {
        alignItems:'center'
    },
    flexDirColumn :{ 
        flexDirection:'column',
    },
    flexDirRow:{
        flexDirection:'row',
    },
    textInputStyle:{
        fontSize:16,
        flex:1,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:2,
    },
    textInputForAddress:{
        fontSize:16,
        paddingLeft:5,
        flex:1,
        textAlignVertical:'top',
        paddingLeft:5,
        paddingTop:2,
    },
})