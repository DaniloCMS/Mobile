import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import EmpresasMap from './pages/Map'
import EmpresasDetails from './pages/Details'
import SelectMapPosition from './pages/CreateEmpresa/SelectMapPosition'
import EmpresaData from './pages/CreateEmpresa/EmpresaData'
import Header from './components/Header'

const Routes: React.FC = () => {
	return (
		<NavigationContainer>
			<Navigator screenOptions={{ cardStyle: { backgroundColor: '#f2f3f5' } }}			>
				<Screen name="EmpresasMap" component={EmpresasMap} options={{ headerShown: false }} />
				<Screen name="EmpresasDetails" component={EmpresasDetails}
					options={{ header: () => <Header title="Empresa" showCancel={false} /> }} />
				<Screen name="SelectMapPosition" component={SelectMapPosition}
					options={{ header: () => <Header title="Selecione no mapa" /> }} />
				<Screen name="EmpresaData" component={EmpresaData}
					options={{ header: () => <Header title="Informe os dados" /> }} />
			</Navigator>
		</NavigationContainer>
	)
}

export default Routes