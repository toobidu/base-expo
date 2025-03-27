export const useAuthStyles = (screen) => {
    if (screen === 'login') {
        return StyleSheet.create({
            dividerContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
            },
            dividerLine: {
                flex: 1,
                height: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            dividerText: {
                color: 'white',
                paddingHorizontal: 10,
                fontSize: 14,
            },
            googleButton: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 25,
                paddingVertical: 12,
                paddingHorizontal: 20,
                marginTop: 10,
            },
            googleIcon: {
                marginRight: 10,
            },
            googleButtonText: {
                color: 'white',
                fontSize: 16,
                fontWeight: '600',
            },
        });
    }
};