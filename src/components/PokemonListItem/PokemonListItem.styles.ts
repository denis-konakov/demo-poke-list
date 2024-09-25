import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    paddingVertical: 8,

    backgroundColor: '#ffffff',
    borderRadius: 20,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    elevation: 5,
  },

  image: {
    width: '80%',
    height: 160,
  },

  name: {
    marginTop: 8,

    fontSize: 24,
  },
});

export default styles;
