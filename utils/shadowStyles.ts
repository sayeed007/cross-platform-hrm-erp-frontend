const shadowStyles = {
    shadow1: {
        shadowColor: "rgba(44, 48, 64, 0.08)",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 1, // Android shadow
    },
    shadow2: {
        shadowColor: "rgba(44, 48, 64, 0.06)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 4,
    },
    shadow3: {
        shadowColor: "rgba(44, 48, 64, 0.12)",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 24,
        elevation: 6,
    },
    shadow4: {
        shadowColor: "rgba(44, 48, 64, 0.12)",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 1,
        shadowRadius: 36,
        elevation: 12,
    },
    shadow5: {
        shadowColor: "rgba(44, 48, 64, 0.25)",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 40,
        elevation: 10,
    },
    popUpShadow: {
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 30,
        elevation: 6,
    },
    popUpShadow2: {
        shadowColor: "rgba(0, 0, 0, 1)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    greenishShadow: {
        shadowColor: '#0D8050', // Slightly darker green for contrast
        shadowOffset: { width: 0, height: 4 }, // Larger offset for more visible shadow
        shadowOpacity: 0.6, // Increase opacity for more prominent shadow
        shadowRadius: 6, // Larger blur radius for a smoother shadow
        elevation: 10, // Higher elevation for Android
    },
    orangishShadow: {
        shadowColor: '#D9630E', // Slightly darker orange for contrast
        shadowOffset: { width: 0, height: 4 }, // Larger offset for more visible shadow
        shadowOpacity: 0.6, // Increase opacity for more prominent shadow
        shadowRadius: 6, // Larger blur radius for a smoother shadow
        elevation: 10, // Higher elevation for Android
    }
};

export default shadowStyles;
