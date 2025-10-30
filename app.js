const { useState, useEffect } = React;

// Lucide React icons as inline SVG components
const Plus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const Save = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const Download = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const Upload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const Trash2 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const PillarCollaborationTracker = () => {
  const [pillars, setPillars] = useState([
    {
      id: 1,
      name: 'Knox & Service Business Targeting',
      phase: 'Strategic Planning',
      expanded: true,
      collaborationPoints: [
        {
          id: 1,
          point: '',
          stakeholders: '',
          timeline: '',
          outcome: ''
        }
      ]
    },
    {
      id: 2,
      name: 'Subsidiaries Empowerment',
      phase: 'Cross Regional Alignment',
      expanded: false,
      collaborationPoints: [
        {
          id: 1,
          point: '',
          stakeholders: '',
          timeline: '',
          outcome: ''
        }
      ]
    },
    {
      id: 3,
      name: 'Partner Development',
      phase: 'Initiative Execution',
      expanded: false,
      collaborationPoints: [
        {
          id: 1,
          point: '',
          stakeholders: '',
          timeline: '',
          outcome: ''
        }
      ]
    },
    {
      id: 4,
      name: 'Project Support Operation',
      phase: 'Continues Improvement & Performance Monitoring',
      expanded: false,
      collaborationPoints: [
        {
          id: 1,
          point: '',
          stakeholders: '',
          timeline: '',
          outcome: ''
        }
      ]
    }
  ]);

  const [summary, setSummary] = useState({
    q1q3q4Performance: '',
    obstacles: '',
    helpNeeded: ''
  });

  const [solutions, setSolutions] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Auto-save to browser storage
  useEffect(() => {
    if (autoSaveEnabled) {
      const timer = setTimeout(() => {
        saveToLocal();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [pillars, summary, solutions, autoSaveEnabled]);

  // Load from browser storage on mount
  useEffect(() => {
    loadFromLocal();
  }, []);

  const saveToLocal = () => {
    try {
      const data = {
        pillars,
        summary,
        solutions,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem('pillar_collaboration_data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  };

  const loadFromLocal = () => {
    try {
      const saved = localStorage.getItem('pillar_collaboration_data');
      if (saved) {
        const data = JSON.parse(saved);
        setPillars(data.pillars || pillars);
        setSummary(data.summary || summary);
        setSolutions(data.solutions || '');
      }
    } catch (error) {
      console.error('Error loading from local storage:', error);
    }
  };

  const clearLocalData = () => {
    if (confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
      localStorage.removeItem('pillar_collaboration_data');
      window.location.reload();
    }
  };

  const togglePillar = (pillarId) => {
    setPillars(pillars.map(p => 
      p.id === pillarId ? { ...p, expanded: !p.expanded } : p
    ));
  };

  const addCollaborationPoint = (pillarId) => {
    setPillars(pillars.map(p => {
      if (p.id === pillarId) {
        const newId = Math.max(0, ...p.collaborationPoints.map(cp => cp.id)) + 1;
        return {
          ...p,
          collaborationPoints: [
            ...p.collaborationPoints,
            {
              id: newId,
              point: '',
              stakeholders: '',
              timeline: '',
              outcome: ''
            }
          ]
        };
      }
      return p;
    }));
  };

  const updateCollaborationPoint = (pillarId, pointId, field, value) => {
    setPillars(pillars.map(p => {
      if (p.id === pillarId) {
        return {
          ...p,
          collaborationPoints: p.collaborationPoints.map(cp =>
            cp.id === pointId ? { ...cp, [field]: value } : cp
          )
        };
      }
      return p;
    }));
  };

  const removeCollaborationPoint = (pillarId, pointId) => {
    setPillars(pillars.map(p => {
      if (p.id === pillarId && p.collaborationPoints.length > 1) {
        return {
          ...p,
          collaborationPoints: p.collaborationPoints.filter(cp => cp.id !== pointId)
        };
      }
      return p;
    }));
  };

  const exportData = () => {
    const data = {
      pillars,
      summary,
      solutions,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pillar-collaboration-tracker-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSaveMessage('✓ Data exported successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          setPillars(data.pillars || pillars);
          setSummary(data.summary || summary);
          setSolutions(data.solutions || '');
          setSaveMessage('✓ Data imported successfully!');
          setTimeout(() => setSaveMessage(''), 3000);
        } catch (error) {
          setSaveMessage('✗ Error importing file. Please check the format.');
          setTimeout(() => setSaveMessage(''), 3000);
        }
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  };

  const manualSave = () => {
    saveToLocal();
    setSaveMessage('✓ Data saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-800">
              Pillar Strategy Collaboration Tracker
            </h1>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
                id="import-file"
              />
              <label
                htmlFor="import-file"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                <Upload />
                Import
              </label>
              <button
                onClick={manualSave}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <Save />
                Save
              </button>
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Download />
                Export
              </button>
              <button
                onClick={clearLocalData}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <Trash2 />
                Clear
              </button>
            </div>
          </div>
          {saveMessage && (
            <div className={`text-sm mt-2 ${saveMessage.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
              {saveMessage}
            </div>
          )}
          <p className="text-gray-600">
            Strategy Framework to Working Collaborative Action Plan SRIN-Regional Subs
          </p>
          <p className="text-sm text-indigo-600 font-medium mt-1">
            Supported by Regional Subsidiary MX B2B as Top Down Direction
          </p>
          <div className="flex items-center gap-2 mt-3">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={autoSaveEnabled}
                onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                className="rounded"
              />
              Auto-save enabled
            </label>
          </div>
        </div>

        {/* Pillars Section */}
        <div className="space-y-4 mb-6">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Pillar Header */}
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition"
                onClick={() => togglePillar(pillar.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">{pillar.name}</h2>
                    <p className="text-blue-100 text-sm mt-1">Phase: {pillar.phase}</p>
                  </div>
                  {pillar.expanded ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>

              {/* Pillar Content */}
              {pillar.expanded && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Collaboration Points</h3>
                    <button
                      onClick={() => addCollaborationPoint(pillar.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
                    >
                      <Plus />
                      Add Point
                    </button>
                  </div>

                  <div className="space-y-4">
                    {pillar.collaborationPoints.map((cp, index) => (
                      <div key={cp.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-gray-700">
                            Collaboration Point #{index + 1}
                          </span>
                          {pillar.collaborationPoints.length > 1 && (
                            <button
                              onClick={() => removeCollaborationPoint(pillar.id, cp.id)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Collaboration Point
                            </label>
                            <textarea
                              value={cp.point}
                              onChange={(e) => updateCollaborationPoint(pillar.id, cp.id, 'point', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              rows="2"
                              placeholder="Describe the collaboration point or activity..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Key Stakeholders
                            </label>
                            <input
                              type="text"
                              value={cp.stakeholders}
                              onChange={(e) => updateCollaborationPoint(pillar.id, cp.id, 'stakeholders', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="Teams, departments, partners involved..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Timeline
                            </label>
                            <input
                              type="text"
                              value={cp.timeline}
                              onChange={(e) => updateCollaborationPoint(pillar.id, cp.id, 'timeline', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="Q1, Q2, Monthly, etc..."
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expected Outcome
                            </label>
                            <textarea
                              value={cp.outcome}
                              onChange={(e) => updateCollaborationPoint(pillar.id, cp.id, 'outcome', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              rows="2"
                              placeholder="What results or deliverables are expected from this collaboration..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Performance Summary & Analysis</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subs Feed Summary Q1-Q3/Q4 Performance
              </label>
              <textarea
                value={summary.q1q3q4Performance}
                onChange={(e) => setSummary({ ...summary, q1q3q4Performance: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows="3"
                placeholder="Summarize subsidiary performance across quarters..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Identified & Shared Obstacles
              </label>
              <textarea
                value={summary.obstacles}
                onChange={(e) => setSummary({ ...summary, obstacles: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows="3"
                placeholder="List key challenges and obstacles faced..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Help Needed / Support Required
              </label>
              <textarea
                value={summary.helpNeeded}
                onChange={(e) => setSummary({ ...summary, helpNeeded: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows="3"
                placeholder="Define specific support or resources needed..."
              />
            </div>
          </div>
        </div>

        {/* Solutions Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Brainstorming - Possible Solutions for Each Pillar Strategy
          </h2>
          <textarea
            value={solutions}
            onChange={(e) => setSolutions(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows="6"
            placeholder="Document brainstormed solutions and action items for each pillar strategy..."
          />
        </div>
      </div>
    </div>
  );
};
// Render the app
ReactDOM.render(<PillarCollaborationTracker />, document.getElementById('root'));
