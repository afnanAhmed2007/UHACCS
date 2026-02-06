module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/modal/HealthQuiz.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HealthQuiz
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
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
"use client";
;
;
;
function HealthQuiz() {
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        gender: '',
        age: '',
        feet: '',
        inches: '',
        weightLbs: '',
        goal: '',
        preference: '',
        benchPress: '',
        pushups: '',
        mileTime: ''
    });
    const isStepValid = ()=>{
        switch(step){
            case 1:
                return data.gender !== '';
            case 2:
                return Number(data.age) >= 13 && Number(data.age) <= 100;
            case 3:
                return data.feet !== '' && data.inches !== '' && data.weightLbs !== '';
            case 4:
                return data.goal !== '';
            case 5:
                return data.preference !== '';
            case 6:
                const isLifter = data.preference === 'weightlift' || data.preference === 'both';
                const isRunner = data.preference === 'cardio' || data.preference === 'both';
                const pushupsValid = isLifter ? data.pushups !== '' : true;
                const mileRegex = /^([0-9]|1[0-9]|20):[0-5][0-9]$/;
                const mileValid = isRunner ? mileRegex.test(data.mileTime) : true;
                return pushupsValid && mileValid;
            default:
                return false;
        }
    };
    const nextStep = ()=>{
        if (isStepValid()) {
            if (step < 6) {
                setStep((prev)=>prev + 1);
            } else {
                console.log("Final Assessment Data:", data);
                alert("Assessment Complete! Check console for results.");
            }
        }
    };
    const prevStep = ()=>{
        if (step > 1) setStep((prev)=>prev - 1);
    };
    const handleInput = (val, key, maxChars)=>{
        let numericValue = val.replace(/[^0-9]/g, '');
        if (key === 'feet' && Number(numericValue) > 7) numericValue = '7';
        if (key === 'inches' && Number(numericValue) > 11) numericValue = '11';
        if (key === 'age' && Number(numericValue) > 100) numericValue = '100';
        if (key === 'weightLbs' && Number(numericValue) > 500) numericValue = '500';
        if (numericValue.length <= maxChars) {
            setData({
                ...data,
                [key]: numericValue
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center min-h-screen bg-[#F0F7FF] p-4 font-sans text-slate-900",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            layout: true,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            },
            className: "w-full max-w-md bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 border-b-8 border-slate-200 overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    mode: "wait",
                    children: [
                        step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -20
                            },
                            className: "space-y-6 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-5xl",
                                    children: "👋"
                                }, void 0, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 285,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-black text-blue-600 tracking-tighter uppercase italic",
                                    children: "I AM..."
                                }, void 0, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 286,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        'male',
                                        'female'
                                    ].map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setData({
                                                    ...data,
                                                    gender: g
                                                });
                                                setStep(2);
                                            },
                                            className: `p-6 border-2 rounded-[1.5rem] capitalize font-black transition-all active:scale-95 border-b-4 ${data.gender === g ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-slate-100 hover:bg-slate-50'}`,
                                            children: g
                                        }, g, false, {
                                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                                            lineNumber: 289,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 287,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "s1", true, {
                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                            lineNumber: 284,
                            columnNumber: 13
                        }, this),
                        step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                x: 20
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            exit: {
                                opacity: 0,
                                x: -20
                            },
                            className: "space-y-6 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-5xl",
                                    children: "🎂"
                                }, void 0, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 300,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-black text-slate-800 uppercase italic",
                                    children: "How old are you?"
                                }, void 0, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 301,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    autoFocus: true,
                                    type: "text",
                                    inputMode: "numeric",
                                    value: data.age,
                                    placeholder: "Age",
                                    className: "w-full p-4 text-center text-2xl font-bold border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500",
                                    onChange: (e)=>handleInput(e.target.value, 'age', 3)
                                }, void 0, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 302,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: !isStepValid(),
                                    onClick: nextStep,
                                    className: "w-full bg-blue-500 disabled:bg-slate-200 text-white p-5 rounded-2xl font-black shadow-[0_4px_0_rgb(37,99,235)] active:shadow-none active:translate-y-1 uppercase transition-all",
                                    children: "Continue"
                                }, void 0, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 303,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "s2", true, {
                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                            lineNumber: 299,
                            columnNumber: 13
                        }, this),
                        step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                x: 20
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            },
                            exit: {
                                opacity: 0,
                                x: -20
                            },
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-black text-slate-800 uppercase italic text-center",
                                    children: "Body Stats"
                                }, void 0, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 310,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            placeholder: "Feet",
                                            value: data.feet,
                                            className: "p-4 text-center text-xl border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-bold",
                                            onChange: (e)=>handleInput(e.target.value, 'feet', 1)
                                        }, void 0, false, {
                                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                                            lineNumber: 312,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            inputMode: "numeric",
                                            placeholder: "Inches",
                                            value: data.inches,
                                            className: "p-4 text-center text-xl border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-bold",
                                            onChange: (e)=>handleInput(e.target.value, 'inches', 2)
                                        }, void 0, false, {
                                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                                            lineNumber: 313,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 311,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    inputMode: "numeric",
                                    placeholder: "Weight (Max 500 lbs)",
                                    value: data.weightLbs,
                                    className: "w-full p-4 text-center text-xl border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none font-bold",
                                    onChange: (e)=>handleInput(e.target.value, 'weightLbs', 3)
                                }, void 0, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 315,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: !isStepValid(),
                                    onClick: nextStep,
                                    className: "w-full bg-blue-500 disabled:bg-slate-200 text-white p-5 rounded-2xl font-black shadow-[0_4px_0_rgb(37,99,235)] active:shadow-none active:translate-y-1 uppercase transition-all",
                                    children: "Continue"
                                }, void 0, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 316,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "s3", true, {
                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                            lineNumber: 309,
                            columnNumber: 13
                        }, this),
                        step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 30
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -30
                            },
                            className: "space-y-3 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-5xl",
                                    children: "🎯"
                                }, void 0, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 323,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-black text-slate-800 uppercase italic",
                                    children: "My Goal"
                                }, void 0, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 324,
                                    columnNumber: 15
                                }, this),
                                [
                                    'lose',
                                    'gain',
                                    'maintain'
                                ].map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setData({
                                                ...data,
                                                goal: g
                                            });
                                            setStep(5);
                                        },
                                        className: "w-full p-5 border-2 border-slate-100 rounded-2xl text-left capitalize font-black hover:bg-slate-50 border-b-4 active:translate-y-1 active:border-b-0 transition-all",
                                        children: [
                                            g,
                                            " Weight"
                                        ]
                                    }, g, true, {
                                        fileName: "[project]/app/modal/HealthQuiz.tsx",
                                        lineNumber: 326,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, "s4", true, {
                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                            lineNumber: 322,
                            columnNumber: 13
                        }, this),
                        step === 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 30
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -30
                            },
                            className: "space-y-3 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-5xl",
                                    children: "💪"
                                }, void 0, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 336,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-black text-slate-800 uppercase italic",
                                    children: "I Prefer..."
                                }, void 0, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 337,
                                    columnNumber: 15
                                }, this),
                                [
                                    'weightlift',
                                    'cardio',
                                    'both'
                                ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setData({
                                                ...data,
                                                preference: p
                                            });
                                            setStep(6);
                                        },
                                        className: "w-full p-5 border-2 border-slate-100 rounded-2xl text-left capitalize font-black hover:bg-slate-50 border-b-4 active:translate-y-1 active:border-b-0 transition-all",
                                        children: p
                                    }, p, false, {
                                        fileName: "[project]/app/modal/HealthQuiz.tsx",
                                        lineNumber: 339,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, "s5", true, {
                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                            lineNumber: 335,
                            columnNumber: 13
                        }, this),
                        step === 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-5xl",
                                            children: "⚡"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                                            lineNumber: 350,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-black text-slate-800 uppercase italic",
                                            children: "Final Stretch!"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                                            lineNumber: 351,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 349,
                                    columnNumber: 15
                                }, this),
                                (data.preference === 'weightlift' || data.preference === 'both') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center px-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-black text-slate-400 uppercase",
                                                    children: "Bench (Optional)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                                    lineNumber: 357,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-black text-blue-400 uppercase",
                                                    children: "Skip if unsure"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                                            lineNumber: 356,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            placeholder: "Max Weight (lbs)",
                                            value: data.benchPress,
                                            className: "w-full p-4 border-2 rounded-2xl outline-none focus:border-blue-500 font-bold",
                                            onChange: (e)=>handleInput(e.target.value, 'benchPress', 3)
                                        }, void 0, false, {
                                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                                            lineNumber: 360,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            placeholder: "Pushups in 1 Min",
                                            value: data.pushups,
                                            className: "w-full p-4 border-2 rounded-2xl outline-none focus:border-blue-500 font-bold",
                                            onChange: (e)=>handleInput(e.target.value, 'pushups', 3)
                                        }, void 0, false, {
                                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                                            lineNumber: 361,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 355,
                                    columnNumber: 17
                                }, this),
                                (data.preference === 'cardio' || data.preference === 'both') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 mt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-black text-slate-400 uppercase px-1",
                                            children: "1-Mile Run (MM:SS)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                                            lineNumber: 367,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            placeholder: "09:30",
                                            value: data.mileTime,
                                            className: "w-full p-4 border-2 rounded-2xl outline-none focus:border-blue-500 font-bold",
                                            onChange: (e)=>setData({
                                                    ...data,
                                                    mileTime: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                                            lineNumber: 368,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 366,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: !isStepValid(),
                                    onClick: nextStep,
                                    className: "w-full bg-[#58CC02] hover:bg-[#46A302] disabled:bg-slate-200 text-white p-5 rounded-2xl font-black shadow-[0_4px_0_rgb(60,135,0)] active:shadow-none active:translate-y-[4px] transition-all uppercase mt-4",
                                    children: "Finish Assessment"
                                }, void 0, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 372,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "s6", true, {
                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                            lineNumber: 348,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                    lineNumber: 281,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pt-6 flex items-center justify-between border-t border-slate-50 mt-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: prevStep,
                            className: `text-xs font-black uppercase tracking-widest cursor-pointer ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-blue-500'}`,
                            children: "← Back"
                        }, void 0, false, {
                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                            lineNumber: 385,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                1,
                                2,
                                3,
                                4,
                                5,
                                6
                            ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    animate: {
                                        width: step === s ? 20 : 8,
                                        backgroundColor: step === s ? "#3B82F6" : "#E2E8F0"
                                    },
                                    className: "h-2 rounded-full"
                                }, s, false, {
                                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                                    lineNumber: 390,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                            lineNumber: 388,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12"
                        }, void 0, false, {
                            fileName: "[project]/app/modal/HealthQuiz.tsx",
                            lineNumber: 393,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/modal/HealthQuiz.tsx",
                    lineNumber: 384,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/modal/HealthQuiz.tsx",
            lineNumber: 276,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/modal/HealthQuiz.tsx",
        lineNumber: 275,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a08d0d11._.js.map