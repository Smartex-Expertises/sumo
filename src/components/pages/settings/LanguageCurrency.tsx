'use client';

import { Globe, DollarSign, Check, Globe2, Save, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  isActive: boolean;
  isDefault: boolean;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
  isActive: boolean;
  isDefault: boolean;
  exchangeRate: number;
}

interface RegionSetting {
  id: string;
  name: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  isActive: boolean;
}

export default function LanguageCurrency() {
  const [languages, setLanguages] = useState<Language[]>([
    { code: 'fr', name: 'Français', nativeName: 'Français', isActive: true, isDefault: true },
    { code: 'en', name: 'Anglais', nativeName: 'English', isActive: true, isDefault: false },
    { code: 'wo', name: 'Wolof', nativeName: 'Wolof', isActive: true, isDefault: false },
    { code: 'es', name: 'Espagnol', nativeName: 'Español', isActive: false, isDefault: false },
    { code: 'pt', name: 'Portugais', nativeName: 'Português', isActive: false, isDefault: false },
  ]);

  const [currencies, setCurrencies] = useState<Currency[]>([
    { code: 'XOF', name: 'Franc CFA', symbol: 'FCFA', isActive: true, isDefault: true, exchangeRate: 1 },
    { code: 'EUR', name: 'Euro', symbol: '€', isActive: true, isDefault: false, exchangeRate: 0.0015 },
    { code: 'USD', name: 'Dollar US', symbol: '$', isActive: true, isDefault: false, exchangeRate: 0.0016 },
    { code: 'XAF', name: 'Franc CFA BEAC', symbol: 'FCFA', isActive: false, isDefault: false, exchangeRate: 1 },
  ]);

  const [regions, setRegions] = useState<RegionSetting[]>([
    { id: '1', name: 'Sénégal', timezone: 'Africa/Dakar', dateFormat: 'DD/MM/YYYY', timeFormat: '24h', isActive: true },
    { id: '2', name: 'Côte d\'Ivoire', timezone: 'Africa/Abidjan', dateFormat: 'DD/MM/YYYY', timeFormat: '24h', isActive: true },
    { id: '3', name: 'Mali', timezone: 'Africa/Bamako', dateFormat: 'DD/MM/YYYY', timeFormat: '24h', isActive: true },
    { id: '4', name: 'France', timezone: 'Europe/Paris', dateFormat: 'DD/MM/YYYY', timeFormat: '24h', isActive: false },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const setDefaultLanguage = (code: string) => {
    setLanguages(langs => langs.map(lang => ({
      ...lang,
      isDefault: lang.code === code
    })));
    setHasChanges(true);
  };

  const setDefaultCurrency = (code: string) => {
    setCurrencies(currs => currs.map(curr => ({
      ...curr,
      isDefault: curr.code === code
    })));
    setHasChanges(true);
  };

  const toggleLanguageStatus = (code: string) => {
    setLanguages(langs => langs.map(lang => 
      lang.code === code ? { ...lang, isActive: !lang.isActive } : lang
    ));
    setHasChanges(true);
  };

  const toggleCurrencyStatus = (code: string) => {
    setCurrencies(currs => currs.map(curr => 
      curr.code === code ? { ...curr, isActive: !curr.isActive } : curr
    ));
    setHasChanges(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulation de sauvegarde
    setTimeout(() => {
      setIsSaving(false);
      setHasChanges(false);
      console.log('Settings saved:', { languages, currencies, regions });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Langue & Devise</h2>
          <p className="text-gray-600 mt-1">Configuration des langues, devises et formats régionaux</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw size={18} />
            Actualiser les taux
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              hasChanges && !isSaving
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save size={18} />
            {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Langues activées</p>
              <p className="text-2xl font-bold mt-1">{languages.filter(l => l.isActive).length}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Globe className="text-blue-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Devises activées</p>
              <p className="text-2xl font-bold mt-1">{currencies.filter(c => c.isActive).length}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="text-green-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Langue par défaut</p>
              <p className="text-2xl font-bold mt-1">Français</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Globe2 className="text-yellow-600" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Devise par défaut</p>
              <p className="text-2xl font-bold mt-1">XOF</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="text-purple-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Languages */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Langues</h3>
            <p className="text-gray-600 text-sm mt-1">Gérez les langues disponibles sur la plateforme</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {languages.map((language) => (
                <div key={language.code} className="flex items-center justify-between p-4 border rounded-lg hover:border-gray-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-lg">{language.code.toUpperCase()}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{language.name}</p>
                        {language.isDefault && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                            Par défaut
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{language.nativeName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {!language.isDefault && (
                      <button
                        onClick={() => setDefaultLanguage(language.code)}
                        className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Définir par défaut
                      </button>
                    )}
                    <button
                      onClick={() => toggleLanguageStatus(language.code)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        language.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {language.isActive ? 'Activée' : 'Désactivée'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium text-gray-900 mb-3">Ajouter une langue</h4>
              <div className="flex gap-3">
                <select className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none">
                  <option>Sélectionner une langue</option>
                  <option value="ar">Arabe</option>
                  <option value="de">Allemand</option>
                  <option value="it">Italien</option>
                </select>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Currencies */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Devises</h3>
            <p className="text-gray-600 text-sm mt-1">Gérez les devises acceptées sur la plateforme</p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {currencies.map((currency) => (
                <div key={currency.code} className="flex items-center justify-between p-4 border rounded-lg hover:border-gray-300 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                      <DollarSign className="text-green-600" size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{currency.name}</p>
                        {currency.isDefault && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                            Par défaut
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">{currency.code}</span>
                        <span className="text-sm font-medium">{currency.symbol}</span>
                        <span className="text-sm text-gray-500">
                          • 1 XOF = {currency.exchangeRate.toFixed(4)} {currency.code}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {!currency.isDefault && (
                      <button
                        onClick={() => setDefaultCurrency(currency.code)}
                        className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Définir par défaut
                      </button>
                    )}
                    <button
                      onClick={() => toggleCurrencyStatus(currency.code)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        currency.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {currency.isActive ? 'Activée' : 'Désactivée'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium text-gray-900 mb-3">Taux de change</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Dernière mise à jour</span>
                  <span className="font-medium">Aujourd'hui, 09:00</span>
                </div>
                <div className="text-sm text-gray-500">
                  Les taux de change sont actualisés automatiquement chaque jour à 00:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Paramètres Régionaux</h3>
          <p className="text-gray-600 text-sm mt-1">Configuration des formats de date, heure et fuseaux horaires</p>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Région</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Fuseau horaire</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Format date</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Format heure</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {regions.map((region) => (
                  <tr key={region.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-medium">{region.name}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {region.timezone}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-mono">{region.dateFormat}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-mono">{region.timeFormat}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        region.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {region.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuseau horaire par défaut
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none">
                  <option>Africa/Dakar</option>
                  <option>UTC</option>
                  <option>Europe/Paris</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format date par défaut
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format heure par défaut
                </label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none">
                  <option>24h</option>
                  <option>12h</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}