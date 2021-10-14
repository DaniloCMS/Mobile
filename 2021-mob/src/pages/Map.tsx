import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import api from '../services/api'
import mapMarker from '../images/map-marker.png'

interface Empresa {
	id: number,
	name: string,
	latitude: number, 
	longitude: number,
	// about: string,
	// instructions: string,
	// empresa_hours: string,
	// open_on_weekends: boolean,
	// images: { id: number, url: string }[]
}

const EmpresasMap: React.FC = () => {
	const [empresa, setEmpresas] = useState<Empresa[]>([])
	const { navigate } = useNavigation()

	useFocusEffect(() => {
		api.get('empresa')
			.then(({ data }) => setEmpresa(data))
			.catch(({ response }) => {
				console.error(response.data)
				return Alert.alert('Erro', 'Falha ao listar empresa.')
			})
	})

	return (
		<View style={styles.container}>
			<MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={
				{ latitude: -28.3304323, longitude: -49.0351485, latitudeDelta: 0.02, longitudeDelta: 0.02 }
			}>
				{empresas.map(empresa => (
					<Marker key={empresa.id} coordinate={{ latitude: empresa.latitude, longitude: empresa.longitude }}
						calloutAnchor={{ x: 2.7, y: 0.9 }} icon={mapMarker}>
						<Callout tooltip={true} onPress={() => navigate('EmpresasDetails', { id: empresa.id })}>
							<View style={styles.calloutContainer}>
								<Text style={styles.calloutText}>{empresa.name}</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>

			<View style={styles.footer}>
				<Text style={styles.footerText}>{empresas.length} Empresas encontrados</Text>

				<RectButton style={styles.createEmpresaButton} onPress={() => navigate('SelectMapPosition')}>
					<Feather name="plus" size={20} color="#fff" />
				</RectButton>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	map: {
		flex: 1
	},

	calloutContainer: {
		backgroundColor: '#ffffffcc',
		borderRadius: 16,
		height: 46,
		justifyContent: 'center',
		paddingHorizontal: 16,
		width: 160
	},

	calloutText: {
		color: '#0089a5',
		fontFamily: 'Nunito_700Bold',
		fontSize: 14
	},

	footer: {
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 20,
		bottom: 32,
		elevation: 4,
		flexDirection: 'row',
		height: 56,
		justifyContent: 'space-between',
		left: 24,
		paddingLeft: 24,
		position: 'absolute',
		right: 24
	},

	footerText: {
		color: '#8fa7b3',
		fontFamily: 'Nunito_700Bold'
	},

	createEmpresaButton: {
		alignItems: 'center',
		backgroundColor: '#15c3d6',
		borderRadius: 20,
		height: 56,
		justifyContent: 'center',
		width: 56
	}
})

export default EmpresasMap