module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/modal/HealthQuiz.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

// "use client";
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// type Goal = 'lose' | 'gain' | 'maintain';
// type Preference = 'weightlift' | 'cardio' | 'both';
// export default function HealthQuiz() {
//   const [step, setStep] = useState(1);
//   const [data, setData] = useState({
//     gender: '',
//     age: '',
//     feet: '',
//     inches: '',
//     weightLbs: '',
//     goal: '' as Goal | '',
//     preference: '' as Preference | '',
//     benchPress: '',
//     pushups: '',
//     mileTime: '',
//   });
//   const isStepValid = () => {
//     switch (step) {
//       case 1: return data.gender !== '';
//       case 2: 
//         const ageNum = Number(data.age);
//         return ageNum >= 13 && ageNum <= 100; 
//       case 3: return data.feet !== '' && data.inches !== '' && data.weightLbs !== '';
//       case 4: return data.goal !== '';
//       case 5: return data.preference !== '';
//       case 6: 
//         const isLifter = data.preference === 'weightlift' || data.preference === 'both';
//         const isRunner = data.preference === 'cardio' || data.preference === 'both';
//         const benchValid = true; // Optional
//         const pushupsValid = isLifter ? data.pushups !== '' : true;
//         const mileRegex = /^([0-9]|1[0-9]|20):[0-5][0-9]$/;
//         const mileValid = isRunner ? mileRegex.test(data.mileTime) : true;
//         return benchValid && pushupsValid && mileValid;
//       default: return false;
//     }
//   };
//   const nextStep = () => {
//     if (isStepValid() && step < 6) setStep(prev => prev + 1);
//     else if (step === 6 && isStepValid()) console.log("Final Data:", data);
//   };
//   const prevStep = () => { if (step > 1) setStep(prev => prev - 1); };
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Enter') {
//         e.preventDefault();
//         nextStep();
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [step, data]); 
//   const handleInput = (val: string, key: string, maxChars: number) => {
//     let numericValue = val.replace(/[^0-9]/g, '');
//     // Constraints
//     if (key === 'feet' && Number(numericValue) > 7) numericValue = '7';
//     if (key === 'inches' && Number(numericValue) > 11) numericValue = '11';
//     if (key === 'age' && Number(numericValue) > 100) numericValue = '100';
//     // NEW: Weight Cap at 500
//     if (key === 'weightLbs' && Number(numericValue) > 500) numericValue = '500';
//     if (numericValue.length <= maxChars) {
//       setData({ ...data, [key]: numericValue });
//     }
//   };
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 font-sans text-slate-900">
//       <motion.div 
//         layout
//         transition={{ type: "spring", stiffness: 350, damping: 35 }}
//         className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 overflow-hidden"
//       >
//         <AnimatePresence mode="wait">
//           {/* Step 1: Gender */}
//           {step === 1 && (
//             <motion.div key="s1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-6">
//               <h2 className="text-2xl font-black text-center uppercase italic tracking-tighter">I AM...</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 {['male', 'female'].map((g) => (
//                   <button key={g} onClick={() => { setData({...data, gender: g}); setStep(2); }} className={`p-6 border-2 rounded-2xl capitalize font-bold cursor-pointer transition-all active:scale-95 ${data.gender === g ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-inner' : 'border-slate-100 shadow-sm'}`}>
//                     {g}
//                   </button>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//           {/* Step 2: Age */}
//           {step === 2 && (
//             <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
//               <h2 className="text-2xl font-black uppercase tracking-tight">Age (13-100)</h2>
//               <input autoFocus type="text" inputMode="numeric" value={data.age} placeholder="e.g. 25" className="w-full p-4 text-lg border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 transition-colors" onChange={(e) => handleInput(e.target.value, 'age', 3)} />
//               <button disabled={!isStepValid()} onClick={nextStep} className="w-full bg-blue-600 disabled:bg-slate-200 text-white p-5 rounded-2xl font-black cursor-pointer shadow-lg transition-all active:scale-95 uppercase">Continue</button>
//             </motion.div>
//           )}
//           {/* Step 3: Height/Weight */}
//           {step === 3 && (
//             <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
//               <h2 className="text-2xl font-black uppercase tracking-tight text-center">Body Stats</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                     <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Feet</label>
//                     <input autoFocus type="text" inputMode="numeric" placeholder="5" value={data.feet} className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500" onChange={(e) => handleInput(e.target.value, 'feet', 1)}/>
//                 </div>
//                 <div className="space-y-1">
//                     <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Inches</label>
//                     <input type="text" inputMode="numeric" placeholder="10" value={data.inches} className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500" onChange={(e) => handleInput(e.target.value, 'inches', 2)}/>
//                 </div>
//               </div>
//               <div className="space-y-1">
//                 <div className="flex justify-between items-center ml-1">
//                   <label className="text-[10px] font-bold text-slate-400 uppercase">Weight (lbs)</label>
//                   <span className="text-[10px] font-bold text-slate-300 uppercase">Max 500</span>
//                 </div>
//                 <input type="text" inputMode="numeric" placeholder="180" value={data.weightLbs} className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500" onChange={(e) => handleInput(e.target.value, 'weightLbs', 3)}/>
//               </div>
//               <button disabled={!isStepValid()} onClick={nextStep} className="w-full bg-blue-600 disabled:bg-slate-200 text-white p-5 rounded-2xl font-black cursor-pointer transition-all active:scale-95 uppercase">Continue</button>
//             </motion.div>
//           )}
//           {/* Step 4: Goal */}
//           {step === 4 && (
//             <motion.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
//               <h2 className="text-2xl font-black text-center uppercase">My Goal</h2>
//               {['lose', 'gain', 'maintain'].map((g) => (
//                 <button key={g} onClick={() => { setData({...data, goal: g as Goal}); setStep(5); }} className="w-full p-5 border-2 border-slate-100 rounded-2xl text-left capitalize font-bold cursor-pointer hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
//                   {g} Weight
//                 </button>
//               ))}
//             </motion.div>
//           )}
//           {/* Step 5: Preference */}
//           {step === 5 && (
//             <motion.div key="s5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
//               <h2 className="text-2xl font-black text-center uppercase">I Prefer...</h2>
//               {['weightlift', 'cardio', 'both'].map((p) => (
//                 <button key={p} onClick={() => { setData({...data, preference: p as Preference}); setStep(6); }} className="w-full p-5 border-2 border-slate-100 rounded-2xl text-left capitalize font-bold cursor-pointer hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
//                   {p}
//                 </button>
//               ))}
//             </motion.div>
//           )}
//           {/* Step 6: Performance */}
//           {step === 6 && (
//             <motion.div key="s6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
//               <h2 className="text-2xl font-black text-center uppercase tracking-tight">Performance</h2>
//               {(data.preference === 'weightlift' || data.preference === 'both') && (
//                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-4">
//                   <div className="space-y-1">
//                     <div className="flex justify-between items-center ml-1">
//                       <label className="text-[10px] font-bold text-slate-400 uppercase">Max Bench (lbs)</label>
//                       <span className="text-[10px] font-bold text-blue-400 uppercase">Optional</span>
//                     </div>
//                     <input autoFocus type="text" inputMode="numeric" placeholder="Optional" value={data.benchPress} className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 transition-colors" onChange={(e) => handleInput(e.target.value, 'benchPress', 3)}/>
//                   </div>
//                   <div className="space-y-1">
//                     <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Pushups in 1 Min</label>
//                     <input type="text" inputMode="numeric" placeholder="Reps" value={data.pushups} className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 transition-colors" onChange={(e) => handleInput(e.target.value, 'pushups', 3)}/>
//                   </div>
//                 </motion.div>
//               )}
//               {(data.preference === 'cardio' || data.preference === 'both') && (
//                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-1">
//                   <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">1-Mile Run (MM:SS) - Max 20:00</label>
//                   <input type="text" placeholder="09:30" value={data.mileTime} className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 transition-colors" onChange={(e) => setData({...data, mileTime: e.target.value})}/>
//                 </motion.div>
//               )}
//               <button disabled={!isStepValid()} onClick={nextStep} className="w-full bg-green-600 disabled:bg-slate-200 text-white p-5 rounded-2xl font-black cursor-pointer shadow-lg shadow-green-100 transition-all active:scale-95 uppercase mt-2">Finish</button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         {/* Footer */}
//         <div className="pt-6 flex items-center justify-between border-t border-slate-50 mt-4">
//           <button type="button" onClick={prevStep} className={`text-xs font-bold uppercase tracking-widest cursor-pointer transition-opacity ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-600'}`}>
//             ← Back
//           </button>
//           <div className="flex gap-2">
//             {[1,2,3,4,5,6].map(s => (
//               <motion.div key={s} animate={{ width: step === s ? 24 : 6, backgroundColor: step === s ? "#2563eb" : "#e2e8f0" }} className="h-1.5 rounded-full" />
//             ))}
//           </div>
//           <div className="w-12" />
//         </div>
//       </motion.div>
//     </div>
//   );
// }
}),
"[project]/app/modal/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Modal",
    ()=>Modal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$modal$2f$HealthQuiz$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/modal/HealthQuiz.tsx [app-rsc] (ecmascript)");
;
;
const Modal = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$modal$2f$HealthQuiz$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/modal/page.tsx",
            lineNumber: 7,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/modal/page.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$modal$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/modal/page.tsx [app-rsc] (ecmascript)");
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$modal$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Modal"], {}, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 7,
            columnNumber: 5
        }, this)
    }, void 0, false);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fd2ea29a._.js.map