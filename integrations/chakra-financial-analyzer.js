/**
 * 🔮 Chakra Financial Analyzer for Essi-Moon
 * Analyzes spending patterns through chakra energy lens
 * Designed for dyscalculia-friendly financial management
 */

class ChakraFinancialAnalyzer {
    constructor() {
        this.chakras = {
            1: { name: 'Root', color: '🔴', focus: 'Security & Survival' },
            2: { name: 'Sacral', color: '🟠', focus: 'Creativity & Relationships' },
            3: { name: 'Solar Plexus', color: '🟡', focus: 'Personal Power & Finance' },
            4: { name: 'Heart', color: '💚', focus: 'Love & Connection' },
            5: { name: 'Throat', color: '💙', focus: 'Communication & Expression' },
            6: { name: 'Third Eye', color: '💜', focus: 'Intuition & Wisdom' },
            7: { name: 'Crown', color: '🤍', focus: 'Spiritual & Higher Purpose' }
        };

        this.spendingCategories = {
            // Root Chakra (1) - Security
            'Circle K': 1, 'Shell': 1, 'fuel': 1, 'rent': 1, 'insurance': 1,
            'Elisa Eesti': 1, 'phone': 1, 'internet': 1,
            
            // Sacral Chakra (2) - Creativity & Relationships  
            'restaurant': 2, 'entertainment': 2, 'gifts': 2,
            'Coffeeshop': 2, 'social': 2,
            
            // Solar Plexus Chakra (3) - Power & Finance
            'Bold Stack': 3, 'investment': 3, 'business': 3,
            'Revolut Digital Assets': 3, 'crypto': 3,
            
            // Heart Chakra (4) - Love & Care
            'BetterHelp': 4, 'therapy': 4, 'family_transfer': 4,
            'Alexandra Polyakov': 4, 'Eva Sofia': 4,
            
            // Throat Chakra (5) - Communication & Learning
            'Apple': 5, 'Microsoft': 5, 'education': 5,
            'Disney+': 5, 'Anthropic': 5, 'Claude': 5,
            
            // Third Eye Chakra (6) - Wisdom & Insight
            'books': 6, 'courses': 6, 'analysis_tools': 6,
            'Cursor': 6, 'development_tools': 6,
            
            // Crown Chakra (7) - Spiritual & Purpose
            'donations': 7, 'spiritual_practices': 7, 'meditation': 7
        };
    }

    /**
     * Analyze transaction and assign chakra energy
     */
    analyzeTransaction(transaction) {
        const description = transaction.description.toLowerCase();
        let chakra = 3; // Default to Solar Plexus (financial)
        
        // Find matching category
        for (const [keyword, chakraNum] of Object.entries(this.spendingCategories)) {
            if (description.includes(keyword.toLowerCase())) {
                chakra = chakraNum;
                break;
            }
        }
        
        return {
            ...transaction,
            chakra: chakra,
            chakraInfo: this.chakras[chakra],
            energyType: this.getEnergyType(transaction.amount, chakra),
            recommendation: this.getRecommendation(transaction.amount, chakra)
        };
    }

    /**
     * Determine energy type based on amount and chakra
     */
    getEnergyType(amount, chakra) {
        const absAmount = Math.abs(amount);
        
        if (absAmount > 100) return 'high_energy';
        if (absAmount > 50) return 'medium_energy';
        return 'low_energy';
    }

    /**
     * Get chakra-specific recommendation
     */
    getRecommendation(amount, chakra) {
        const absAmount = Math.abs(amount);
        const chakraName = this.chakras[chakra].name;
        
        if (absAmount > 100) {
            return `🔮 High ${chakraName} energy spending detected. Check if aligned with your current life goals.`;
        }
        
        if (absAmount > 50) {
            return `⚡ Medium ${chakraName} energy. Good balance for this area of life.`;
        }
        
        return `✨ Light ${chakraName} energy. Consider if this area needs more attention.`;
    }

    /**
     * Analyze daily spending pattern
     */
    analyzeDailyPattern(transactions) {
        const chakraSpending = {};
        let totalSpent = 0;
        
        // Initialize chakra spending
        for (let i = 1; i <= 7; i++) {
            chakraSpending[i] = 0;
        }
        
        // Process transactions
        transactions.forEach(transaction => {
            if (transaction.amount < 0) { // Spending (negative amounts)
                const analyzed = this.analyzeTransaction(transaction);
                chakraSpending[analyzed.chakra] += Math.abs(analyzed.amount);
                totalSpent += Math.abs(analyzed.amount);
            }
        });
        
        return {
            totalSpent: totalSpent,
            chakraBreakdown: chakraSpending,
            dominantChakra: this.findDominantChakra(chakraSpending),
            energyBalance: this.assessEnergyBalance(chakraSpending),
            recommendations: this.generateRecommendations(chakraSpending, totalSpent)
        };
    }

    /**
     * Find which chakra had most spending
     */
    findDominantChakra(chakraSpending) {
        let maxSpending = 0;
        let dominantChakra = 1;
        
        for (const [chakra, amount] of Object.entries(chakraSpending)) {
            if (amount > maxSpending) {
                maxSpending = amount;
                dominantChakra = parseInt(chakra);
            }
        }
        
        return {
            chakra: dominantChakra,
            info: this.chakras[dominantChakra],
            amount: maxSpending
        };
    }

    /**
     * Assess overall energy balance
     */
    assessEnergyBalance(chakraSpending) {
        const total = Object.values(chakraSpending).reduce((sum, amount) => sum + amount, 0);
        const balance = {};
        
        for (let i = 1; i <= 7; i++) {
            const percentage = total > 0 ? (chakraSpending[i] / total) * 100 : 0;
            balance[i] = {
                percentage: Math.round(percentage),
                status: this.getChakraStatus(percentage),
                chakra: this.chakras[i]
            };
        }
        
        return balance;
    }

    /**
     * Get chakra balance status
     */
    getChakraStatus(percentage) {
        if (percentage > 40) return 'overactive';
        if (percentage > 15) return 'balanced'; 
        if (percentage > 5) return 'moderate';
        return 'underactive';
    }

    /**
     * Generate personalized recommendations
     */
    generateRecommendations(chakraSpending, totalSpent) {
        const recommendations = [];
        
        // Check for imbalances
        const balance = this.assessEnergyBalance(chakraSpending);
        
        for (const [chakraNum, info] of Object.entries(balance)) {
            if (info.status === 'overactive') {
                recommendations.push({
                    type: 'warning',
                    chakra: info.chakra,
                    message: `${info.chakra.color} ${info.chakra.name} chakra is overactive (${info.percentage}%). Consider balancing with other life areas.`
                });
            }
            
            if (info.status === 'underactive') {
                recommendations.push({
                    type: 'suggestion',
                    chakra: info.chakra,
                    message: `${info.chakra.color} ${info.chakra.name} chakra needs attention (${info.percentage}%). Consider investing in ${info.chakra.focus.toLowerCase()}.`
                });
            }
        }
        
        // Overall spending recommendations
        if (totalSpent > 100) {
            recommendations.push({
                type: 'alert',
                message: `🚨 High daily spending: €${totalSpent}. Review if aligned with your intentions.`
            });
        }
        
        return recommendations;
    }

    /**
     * Generate simple status for dyscalculia-friendly display
     */
    getSimpleStatus(balance) {
        if (balance > 1000) return { color: '🟢', status: 'Safe', message: 'Good energy flow' };
        if (balance > 500) return { color: '🟡', status: 'Caution', message: 'Monitor energy' };
        return { color: '🔴', status: 'Alert', message: 'Focus needed' };
    }

    /**
     * Format currency for dyscalculia-friendly display
     */
    formatCurrency(amount) {
        return `€${Math.round(amount / 5) * 5}`; // Round to nearest 5
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChakraFinancialAnalyzer;
}

// Usage example:
/*
const analyzer = new ChakraFinancialAnalyzer();
const transactions = [
    { description: 'Circle K Fuel', amount: -25.30, date: '2025-07-08' },
    { description: 'BetterHelp therapy', amount: -60.00, date: '2025-07-08' },
    { description: 'Bold Stack investment', amount: -20.00, date: '2025-07-08' }
];

const analysis = analyzer.analyzeDailyPattern(transactions);
console.log(analysis);
*/
