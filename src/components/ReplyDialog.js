import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
const ReplyDialog = ({ message, onClose }) => {
    const [replyText, setReplyText] = useState('');

    const handleSendReply = () => {
        console.log(message);
        console.log(onClose);
        // Implement your logic to send the reply message
        // For example, you can call a function to send the reply to the server

        // Close the reply dialog
        onClose();
    };

    return (
        <Modal animationType="slide" transparent={true} visible={true}>
            <View style={styles.modalContainer}>
                <View style={styles.dialogContainer}>
                    <Text style={styles.dialogHeader}>Reply to Message</Text>
                    <Text>{message}</Text>
                    <TextInput
                        style={styles.replyInput}
                        placeholder="Type your reply here"
                        multiline={true}
                        value={replyText}
                        onChangeText={(text) => setReplyText(text)}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSendReply}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
ReplyDialog.propTypes = {
    message: PropTypes.string,
    onClose: PropTypes.func,
};
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialogContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '80%',
        alignItems: 'center',
    },
    dialogHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    replyInput: {
        width: '100%',
        minHeight: 80,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        marginBottom: 10,
    },
    sendButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'black',
    },
});

export default ReplyDialog;
