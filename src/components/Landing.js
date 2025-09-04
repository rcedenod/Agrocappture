import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Linking } from 'react-native';
import { useKeycloak } from '@react-keycloak/native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const Landing = ({ navigation }) => {
    const { keycloak, initialized } = useKeycloak();

    // Hook para manejar la navegación al Dashboard cuando el usuario se autentica
    useEffect(() => {
        const handleLoginSuccess = () => {
            if (keycloak.authenticated) {
                console.log('Usuario autenticado. Navegando al Dashboard...');
                navigation.navigate('Dashboard');
            }
        };

        if (initialized) {
            // Se suscribe al evento de éxito del login de Keycloak.
            keycloak.onReady = () => {
                if (keycloak.authenticated) {
                    handleLoginSuccess();
                }
            };
            keycloak.onAuthSuccess = handleLoginSuccess;
        }

        // Limpia los listeners cuando el componente se desmonta.
        return () => {
            if (initialized) {
                keycloak.onReady = undefined;
                keycloak.onAuthSuccess = undefined;
            }
        };
    }, [initialized, keycloak, navigation]);

    const loginWithInAppBrowser = async () => {
        try {
            // Obtener la URL de login de Keycloak
            const authUrl = keycloak.createLoginUrl();

            if (await InAppBrowser.isAvailable()) {
                // Abre la URL en el navegador interno.
                const result = await InAppBrowser.openAuth(authUrl, keycloak.redirectUri);

                if (result.type === 'success' && keycloak.authenticated) {
                    // Si el login fue exitoso y Keycloak lo valida, se navega
                    navigation.navigate('Dashboard');
                }
            } else {
                Linking.openURL(authUrl);
            }
        } catch (error) {
            console.error('Error al abrir el navegador interno:', error);
        }
    };

    // Muestra una pantalla de carga mientras el cliente de Keycloak se inicializa
    if (!initialized) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    // Muestra la pantalla de aterrizaje
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <Pressable style={styles.loginButton} onPress={loginWithInAppBrowser}>
                <Text style={styles.loginText}>Iniciar sesión</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 48
    },
    loginButton: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 15,
        borderRadius: 30,
        marginTop: 16,
        alignItems: 'center'
    },
    loginText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000'
    },
});

export default Landing;