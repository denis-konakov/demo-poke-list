import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  content: {
    width: '90%',
    paddingHorizontal: 16,
    paddingVertical: 24,

    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 240,

    marginBottom: 16,
  },

  infoText: {
    marginBottom: 8,

    fontSize: 18,
  },

  closeButton: {
    height: 50,
    marginTop: 16,

    backgroundColor: '#0074ec',
    borderRadius: 16,

    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
