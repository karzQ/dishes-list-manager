import React, { useEffect, useState } from 'react'
import {SafeAreaView, StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';

import IngredientFormular from "./../components/IngredientFormular";

const AddProduct = ({navigation}) => {

  
  return (
    <SafeAreaView>
      <IngredientFormular />
    </SafeAreaView>
  )
}

export default AddProduct;