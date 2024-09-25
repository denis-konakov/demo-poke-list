import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#ffffff',
  },

  header: {
    paddingTop: 16,
    alignItems: 'center',
  },

  headerTitle: {
    marginBottom: 16,

    fontSize: 24,
    fontWeight: 'bold',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listColumnWrapper: {
    gap: 16,
  },

  listContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 160,
    gap: 16,
  },

  emptyListContainer: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },

  moreLoaderContainer: {
    alignItems: 'center',
  },
});

export default styles;
