import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  searchbar: {
    marginBottom: 2,
  },
  button: {
    marginBottom: 20,
  },
  dataCard: {
    flex: 3,
    marginBottom: 20,
    marginTop: 2,
    padding: 10, 
    height: 'auto', 
    width: '100%', 
  },
  animationCard: {
    flex: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  temp: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    lineHeight: 30, 
  },
  lottie: {
    width: '90%',
    height: '90%',
    alignSelf: 'center',
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    padding: 5,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    color: '#3F51B5',
    fontWeight: 'bold',
  },
  alert: {
    fontSize: 20,
    color: '#ff0000',
    fontWeight: 'bold',
  },
});

