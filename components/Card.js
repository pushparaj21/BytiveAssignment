/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Drink from '../assets/Drink.svg';
import Edit from '../assets/Edit.svg';
import Email from '../assets/Email.svg';
import Call from '../assets/Call.svg';
import Enternet from '../assets/Enternet.svg';
import HeartOutlined from '../assets/HeartOutlined.svg';
import Delete from '../assets/Delete.svg';
import {SvgCssUri} from 'react-native-svg';

export default function Card({
  name,
  username,
  email,
  phone,
  website,
  _id,
  onDelete,
}) {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  //it is for showing card data
  const [showName, setShowName] = useState(name);
  const [showEmail, setShowEmail] = useState(email);
  const [showPhone, setShowPhone] = useState(phone);
  const [showWebsite, setShowWebsite] = useState(website);

  //it is for modal form and network req
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedPhone, setEditedPhone] = useState(phone);
  const [editedWebsite, setEditedWebsite] = useState(website);

  //function of Card
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const handleEditPress = () => {
    setShowModal(true);
  };
  const handleDelete = () => {
    onDelete(_id);
  };
  // function of modal
  const handleSavePress = () => {
    console.log(editedName);
    fetch(`https://bytive2.onrender.com/editUser/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: editedName,
        email: editedEmail,
        phone: editedPhone,
        website: editedWebsite,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update card.');
        }
        setShowName(editedName);
        setShowEmail(editedEmail);
        setShowPhone(editedPhone);
        setShowWebsite(editedWebsite);
        // handleEdit(item.id, name, email, phone, website);
        setShowModal(false);
      })
      .catch(error => console.error(error));
  };

  const handleCancelPress = () => {
    setShowModal(false);
    setEditedName(showName);
    setEditedEmail(showEmail);
    setEditedPhone(showPhone);
    setEditedWebsite(showWebsite);
  };

  // user svg function
  const onError = e => {
    console.log(e.message);
    setLoading(false);
  };
  const onLoad = () => {
    console.log('Svg loaded!');
    setLoading(false);
  };
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <SvgCssUri
          width="200"
          height="200"
          uri={`https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`}
          onError={onError}
          onLoad={onLoad}
        />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.cardName}>{showName}</Text>
        <View style={styles.row}>
          <Email width="18" height="18" />
          <Text style={styles.cardEmailText}>{showEmail}</Text>
        </View>
        <View style={styles.detailView}>
          <Call width="18" height="18" />
          <Text style={styles.ml3}>{showPhone}</Text>
        </View>
        <View style={styles.detailView}>
          <Enternet width="18" height="18" />
          <Text style={styles.ml3}>{showWebsite}</Text>
        </View>
      </View>
      <View style={styles.cardBottom}>
        <TouchableOpacity onPress={toggleFavorite}>
          {isFavorite ? (
            <Drink width="20" height="20" />
          ) : (
            <HeartOutlined width="20 " height="20" />
          )}
        </TouchableOpacity>

        <View style={styles.hrLine} />
        <TouchableOpacity onPress={handleEditPress}>
          <Edit width="20" height="20" />
        </TouchableOpacity>

        <View style={styles.hrLine} />
        <TouchableOpacity onPress={handleDelete}>
          <Delete width="18" height="18" />
        </TouchableOpacity>
      </View>

      <Modal visible={showModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeadText}>Basic Modal</Text>
          <View style={{paddingHorizontal: 20}}>
            <TextInput
              placeholder="Name"
              value={editedName}
              onChangeText={setEditedName}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Email"
              value={editedEmail}
              onChangeText={setEditedEmail}
              keyboardType="email-address"
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Phone"
              value={editedPhone.toString()}
              onChangeText={setEditedPhone}
              keyboardType="numeric"
              maxLength={10}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Website"
              value={editedWebsite}
              onChangeText={setEditedWebsite}
              style={styles.modalInput}
            />
          </View>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.cancleBtn}
              onPress={handleCancelPress}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSavePress}>
              <Text style={{color: 'white'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: '92%',
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#e8e8e8',
    alignSelf: 'center',
  },
  cardHeader: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  cardDetails: {width: '100%', padding: 24},
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  cardName: {
    color: '#000000d9',
    fontSize: 16,
    marginBottom: '1.5%',
    fontWeight: '500',
    lineHeight: 24.56,
  },
  row: {flexDirection: 'row'},
  cardEmailText: {marginLeft: '3%', marginBottom: '2%'},
  detailView: {flexDirection: 'row', marginBottom: '2%'},
  ml3: {marginLeft: 3},
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderTopColor: '#e8e8e8',
    borderTopWidth: 1,
    paddingTop: '3%',
    paddingBottom: '3%',
  },
  hrLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#e8e8e8',
  },
  modalHeadText: {
    color: 'black',
    fontWeight: '500',
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
    lineHeight: 22,
    fontSize: 16,
    marginTop: 10,
  },
  modalInput: {
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingVertical: 0,
    borderRadius: 3,
    marginTop: 10,
  },
  cancleBtn: {
    borderColor: 'red',
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 2,
    marginRight: 10,
  },
  saveBtn: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 2,
    marginRight: 15,
    backgroundColor: '#1890ff',
  },

  editButton: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#cccccc',
    margin: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 12,
    marginTop: 20,
    borderTopColor: '#cccccc',
    borderTopWidth: 1,
  },
});
