import React from "react";
import { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, Zap, Shield, Users, FileText, FileCode, ArrowRight, Activity, Lock, Code, GitBranch, RefreshCw, Target, Layers, Clock, Rocket, Bug, RotateCcw, FlaskConical, BookOpen, ShieldCheck, Cpu, Globe, SquareCheck, Search, Filter, Package, Server } from "lucide-react";
import InnovaiLogo from "./assets/INNOVAI_Logo.png";

const C = { navy: "#0D1628", navy2: "#111D38", navy3: "#172040", orange: "#E8910A", orangeL: "#F5A623", cyan: "#5AB0CC", cyanL: "#7ECDE6", emerald: "#10B981", amber: "#F59E0B", red: "#EF4444", slate: "#1E2D50", slateL: "#2A3D68", text: "#E2E8F0", textD: "#94A3B8" };

const ARTS = [{ id: "I", l: "Rastreabilidade", i: GitBranch, c: C.cyan }, { id: "II", l: "Stage Gates", i: Shield, c: C.orange }, { id: "III", l: "Test-First", i: FlaskConical, c: C.emerald }, { id: "IV", l: "Revisão Adversária", i: Lock, c: C.amber }, { id: "V", l: "Simplicidade", i: Filter, c: C.cyan }, { id: "VI", l: "Integração Contínua", i: RefreshCw, c: C.emerald }, { id: "VII", l: "Observabilidade", i: Activity, c: C.orange }, { id: "VIII", l: "Segurança", i: ShieldCheck, c: C.red }, { id: "IX", l: "Docs Vivos", i: BookOpen, c: C.cyanL }];

const STAGES = [{ id: "intake", label: "INTAKE", icon: Search, desc: "Definição do problema e viabilidade", color: C.cyan }, { id: "specify", label: "SPECIFY", icon: FileText, desc: "Requisitos e critérios de aceitação", color: C.cyanL }, { id: "plan", label: "PLAN", icon: Layers, desc: "Arquitetura e seleção de tecnologias", color: C.orange }, { id: "tasks", label: "TASKS", icon: SquareCheck, desc: "Decomposição e alocação de recursos", color: C.amber }, { id: "implement", label: "IMPLEMENT", icon: Code, desc: "Código e testes via Test-First", color: C.emerald }, { id: "verify", label: "VERIFY", icon: ShieldCheck, desc: "Auditoria constitucional e deploy", color: C.emerald }];

const MODES = [{ id: "copilot", label: "Copilot", sub: "Fluxo Rápido", Icon: Zap, color: C.emerald, risk: "Baixo", riskC: C.emerald, steps: ["IA analisa requisitos", "IA gera testes", "IA implementa", "IA verifica e commita", "Humano monitora exceções"], result: "80% redução de tempo em tarefas rotineiras" }, { id: "human", label: "Human", sub: "Pontos de Revisão", Icon: Users, color: C.orange, risk: "Médio", riskC: C.amber, steps: ["IA gera plano", "✋ Humano revisa", "IA escreve testes", "✋ Humano revisa testes", "IA implementa", "✋ Humano aprova commit"], result: "Controle especialista em decisões críticas" }, { id: "challenger", label: "Challenger", sub: "Auditoria Adversária", Icon: Shield, color: C.red, risk: "Alto", riskC: C.red, steps: ["IA Proponente cria impl.", "⚔️ IA Challenger ataca", "Proponente defende", "✋ Humano arbitra", "Impl. aprovada commitada"], result: "Vulnerabilidades capturadas antes da produção" }];

function Badge({ children, color = C.cyan }) { return <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 999, background: color + "22", border: `1px solid ${color}55`, color, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{children}</span> }
function Card({ children, style = {}, glow }) { return <div style={{ background: `linear-gradient(145deg,${C.slate},${C.navy2})`, border: `1px solid ${glow ? glow + "55" : C.slateL}`, borderRadius: 16, boxShadow: glow ? `0 0 28px ${glow}18` : "none", ...style }}>{children}</div> }
function Bar({ pct, color }) { return <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 999, overflow: "hidden", marginTop: 4 }}><div style={{ height: "100%", width: `${pct}%`, borderRadius: 999, background: `linear-gradient(90deg,${color}88,${color})` }} /></div> }

function Step1() {
    const [fmt, setFmt] = useState(null);
    const bots = [{ l: "Retrabalho & Bug Fixes", p: 45, c: C.red }, { l: "Overruns de Orçamento", p: 30, c: C.amber }, { l: "Atrasos de Entrega", p: 60, c: C.orange }, { l: "Gaps de Auditoria", p: 55, c: C.cyan }, { l: "Desalinhamento de Times", p: 40, c: C.cyanL }];
    const fmts = [{ id: "poc", l: "PoC", d: "Prova de Conceito", I: FlaskConical, w: "1–2 sem" }, { id: "mvp", l: "MVP", d: "Produto Mínimo Viável", I: Package, w: "3–6 sem" }, { id: "scale", l: "Escala", d: "Enterprise", I: Globe, w: "2–6 meses" }];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Card style={{ padding: 24 }} glow={C.red}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${C.red}22`, display: "flex", alignItems: "center", justifyContent: "center" }}><AlertTriangle size={16} color={C.red} /></div>
                        <div><div style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>Mapeamento de Gargalos</div><div style={{ fontSize: 11, color: C.textD }}>Tempo perdido no processo atual</div></div>
                    </div>
                    {bots.map(b => <div key={b.l} style={{ marginBottom: 14 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><span style={{ fontSize: 12, color: C.textD }}>{b.l}</span><span style={{ fontSize: 12, fontWeight: 700, color: b.c }}>{b.p}%</span></div><Bar pct={b.p} color={b.c} /></div>)}
                </Card>
                <Card style={{ padding: 24 }} glow={C.orange}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${C.orange}22`, display: "flex", alignItems: "center", justifyContent: "center" }}><Target size={16} color={C.orange} /></div>
                        <div><div style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>Eixo Problemático</div><div style={{ fontSize: 11, color: C.textD }}>Diagnóstico estratégico</div></div>
                    </div>
                    {[{ a: "Qualidade", s: "Crítico", d: "Inconsistência entre times", c: C.red }, { a: "Velocidade", s: "Alerta", d: "3–6 meses de atraso médio", c: C.amber }, { a: "Conformidade", s: "Alerta", d: "Trilhas de auditoria inadequadas", c: C.amber }, { a: "Rastreabilidade", s: "Risco", d: "Processo manual e propenso a erro", c: C.orange }].map(i => (
                        <div key={i.a} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: `1px solid ${i.c}33` }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: i.c, flexShrink: 0 }} />
                            <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{i.a}</div><div style={{ fontSize: 11, color: C.textD }}>{i.d}</div></div>
                            <Badge color={i.c}>{i.s}</Badge>
                        </div>
                    ))}
                </Card>
            </div>
            <Card style={{ padding: 24 }} glow={C.cyan}>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 4 }}>Escolha o Formato da Solução</div>
                <div style={{ fontSize: 12, color: C.textD, marginBottom: 20 }}>Selecione a abordagem de entrega adequada ao seu contexto</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                    {fmts.map(f => {
                        const I = f.I; const a = fmt === f.id; return (
                            <button key={f.id} onClick={() => setFmt(f.id)} style={{ all: "unset", cursor: "pointer", padding: "20px 16px", borderRadius: 14, textAlign: "center", background: a ? `${C.cyan}18` : "rgba(255,255,255,0.03)", border: `2px solid ${a ? C.cyan : C.slateL}`, transition: "all 0.25s", boxShadow: a ? `0 0 20px ${C.cyan}30` : "none" }}>
                                <I size={28} color={a ? C.cyan : C.textD} style={{ marginBottom: 10 }} />
                                <div style={{ fontWeight: 800, fontSize: 15, color: a ? C.cyan : "#fff", marginBottom: 2 }}>{f.l}</div>
                                <div style={{ fontSize: 11, color: C.textD, marginBottom: 8 }}>{f.d}</div>
                                <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 999, background: a ? `${C.cyan}25` : "rgba(255,255,255,0.06)", fontSize: 10, color: a ? C.cyan : C.textD, fontWeight: 600 }}>{f.w}</div>
                            </button>
                        );
                    })}
                </div>
                {fmt && <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: `${C.emerald}12`, border: `1px solid ${C.emerald}40`, display: "flex", alignItems: "center", gap: 10 }}><CheckCircle size={16} color={C.emerald} /><span style={{ color: C.emerald, fontSize: 12, fontWeight: 600 }}>Formato {fmts.find(f => f.id === fmt)?.l} selecionado. Pronto para Etapa 2.</span></div>}
            </Card>
        </div>
    );
}

function Step2() {
    const [phase, setPhase] = useState(0);
    useEffect(() => { if (phase < 2) { const t = setTimeout(() => setPhase(p => p + 1), 1600); return () => clearTimeout(t); } }, [phase]);
    const raw = [{ I: Activity, l: "Gravações de Reuniões", s: "12 .mp4" }, { I: FileText, l: "Docs de Requisitos", s: "8 .docx/.pdf" }, { I: Server, l: "Planilhas de Dados", s: "5 .xlsx" }, { I: GitBranch, l: "Histórico Git", s: "Logs & PRs" }];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card style={{ padding: 24 }} glow={C.orange}>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 16, marginBottom: 4 }}>Transformação de Materiais Brutos</div>
                <div style={{ fontSize: 12, color: C.textD, marginBottom: 24 }}>Reuniões, documentos e históricos destilados em Artefato de Input Técnico</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr", gap: 16, alignItems: "center" }}>
                    <div>
                        <div style={{ fontSize: 10, color: C.textD, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Materiais Brutos</div>
                        {raw.map(m => {
                            const I = m.I; return (
                                <div key={m.l} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: "10px 12px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: `1px solid ${C.slateL}`, opacity: phase > 0 ? 0.4 : 1, transition: "opacity 0.8s" }}>
                                    <I size={15} color={C.textD} /><div><div style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>{m.l}</div><div style={{ fontSize: 10, color: C.textD }}>{m.s}</div></div>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 54, height: 54, borderRadius: "50%", background: phase === 1 ? `${C.orange}20` : phase === 2 ? `${C.emerald}20` : "rgba(255,255,255,0.05)", border: `2px solid ${phase === 1 ? C.orange : phase === 2 ? C.emerald : C.slateL}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.5s", boxShadow: phase >= 1 ? `0 0 20px ${phase === 2 ? C.emerald : C.orange}40` : "none" }}>
                            {phase < 2 ? <Cpu size={20} color={phase === 1 ? C.orange : C.textD} style={{ animation: phase === 1 ? "spin 1.5s linear infinite" : "none" }} /> : <CheckCircle size={20} color={C.emerald} />}
                        </div>
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: phase === 2 ? C.emerald : phase === 1 ? C.orange : C.textD, transition: "color 0.5s", textAlign: "center" }}>{["Bruto", "Processando", "Artefato"][phase]}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 10, color: C.textD, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Artefato de Input (OUTPUT)</div>
                        <div style={{ padding: 16, borderRadius: 12, fontFamily: "'Courier New',monospace", fontSize: 11, lineHeight: 1.75, color: phase === 2 ? C.emerald : C.textD, background: phase === 2 ? `${C.emerald}10` : "rgba(255,255,255,0.03)", border: `1px solid ${phase === 2 ? C.emerald + "55" : C.slateL}`, transition: "all 0.8s", opacity: phase === 2 ? 1 : 0.3, whiteSpace: "pre" }}>
                            {`\x23 SWAIF_INPUT_SPEC\nversion: 1.0.0\nproject: nova-plataforma\nformat: MVP\nrisk_level: medium\nstages:\n  - intake: pendente\n  - specify: pendente\n  - plan: pendente\n\x23 Pronto p/ Execução ✓`}
                        </div>
                    </div>
                </div>
                <button onClick={() => setPhase(0)} style={{ all: "unset", cursor: "pointer", marginTop: 16, padding: "7px 14px", borderRadius: 8, background: "rgba(255,255,255,0.05)", color: C.textD, fontSize: 11, border: `1px solid ${C.slateL}`, display: "flex", alignItems: "center", gap: 6 }}>
                    <RotateCcw size={11} /> Reiniciar Simulação
                </button>
            </Card>
            <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        </div>
    );
}

function Step3() {
    const [modeId, setModeId] = useState("copilot");
    const [activeS, setActiveS] = useState(null);
    const [done, setDone] = useState([]);
    const mode = MODES.find(m => m.id === modeId);
    function advance(id, idx) { setActiveS(id); if (!done.includes(id)) { setTimeout(() => { setDone(p => [...p, id]); if (idx < STAGES.length - 1) setActiveS(STAGES[idx + 1].id); }, 1100); } }
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card style={{ padding: 20 }}>
                <div style={{ fontSize: 10, color: C.textD, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Modo de Execução</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                    {MODES.map(m => {
                        const act = modeId === m.id; return (
                            <button key={m.id} onClick={() => setModeId(m.id)} style={{ all: "unset", cursor: "pointer", padding: "14px 16px", borderRadius: 12, background: act ? m.color + "1a" : "rgba(255,255,255,0.03)", border: `2px solid ${act ? m.color : C.slateL}`, transition: "all 0.25s", boxShadow: act ? `0 0 22px ${m.color}25` : "none" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><m.Icon size={16} color={act ? m.color : C.textD} /><span style={{ fontWeight: 800, fontSize: 14, color: act ? m.color : "#fff" }}>{m.label}</span></div>
                                <div style={{ fontSize: 11, color: C.textD, marginBottom: 8 }}>{m.sub}</div>
                                <Badge color={m.riskC}>Risco {m.risk}</Badge>
                            </button>
                        );
                    })}
                </div>
            </Card>
            <Card style={{ padding: 20, border: `1px solid ${mode.color}40` }} glow={mode.color}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                        <div style={{ fontWeight: 700, color: mode.color, fontSize: 14, marginBottom: 12 }}>Fluxo: {mode.label} Mode</div>
                        {mode.steps.map((s, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                                <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: `${mode.color}25`, border: `1px solid ${mode.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: mode.color }}>{i + 1}</div>
                                <div style={{ fontSize: 12, color: C.text, paddingTop: 3 }}>{s}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ padding: 20, borderRadius: 14, background: `${mode.color}10`, border: `1px solid ${mode.color}33`, textAlign: "center" }}>
                            <mode.Icon size={32} color={mode.color} style={{ marginBottom: 10 }} />
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Resultado</div>
                            <div style={{ fontSize: 11, color: C.textD }}>{mode.result}</div>
                        </div>
                    </div>
                </div>
            </Card>
            <Card style={{ padding: 24 }} glow={C.cyan}>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 4 }}>Pipeline de 6 Estágios SWAIF</div>
                <div style={{ fontSize: 12, color: C.textD, marginBottom: 20 }}>Clique para simular o avanço do fluxo de produção</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8, marginBottom: 16 }}>
                    {STAGES.map((s, i) => {
                        const completed = done.includes(s.id); const act = activeS === s.id; return (
                            <button key={s.id} onClick={() => advance(s.id, i)} style={{ all: "unset", cursor: "pointer", padding: "14px 6px", borderRadius: 12, textAlign: "center", background: completed ? `${C.emerald}18` : act ? `${s.color}18` : "rgba(255,255,255,0.03)", border: `2px solid ${completed ? C.emerald : act ? s.color : C.slateL}`, transition: "all 0.3s", boxShadow: act ? `0 0 20px ${s.color}35` : "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                                {completed ? <CheckCircle size={20} color={C.emerald} /> : <s.icon size={20} color={act ? s.color : C.textD} />}
                                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.05em", color: completed ? C.emerald : act ? s.color : C.textD, textTransform: "uppercase" }}>{s.label}</div>
                            </button>
                        );
                    })}
                </div>
                {activeS && <div style={{ padding: "12px 16px", borderRadius: 10, background: done.includes(activeS) ? `${C.emerald}12` : `${C.cyan}12`, border: `1px solid ${done.includes(activeS) ? C.emerald + "40" : C.cyan + "40"}`, display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    {done.includes(activeS) ? <CheckCircle size={16} color={C.emerald} /> : <Activity size={16} color={C.cyan} />}
                    <span style={{ fontSize: 12, fontWeight: 700, color: done.includes(activeS) ? C.emerald : C.cyan }}>{STAGES.find(s => s.id === activeS)?.label}:&nbsp;</span>
                    <span style={{ fontSize: 12, color: C.textD }}>{STAGES.find(s => s.id === activeS)?.desc}</span>
                </div>}
                <div style={{ fontSize: 10, color: C.textD, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Selos de Qualidade — 9 Artigos Constitucionais</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {ARTS.map(a => <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 8, background: `${a.c}12`, border: `1px solid ${a.c}30` }}><a.i size={12} color={a.c} /><span style={{ fontSize: 10, color: a.c, fontWeight: 700 }}>Art.{a.id}</span><span style={{ fontSize: 10, color: C.textD }}>{a.l}</span></div>)}
                </div>
            </Card>
        </div>
    );
}

function Step4() {
    const [tab, setTab] = useState("bash");
    const findings = [{ s: "Crítico", n: 2, c: C.red, items: ["Falha de autenticação no edge case", "SQL injection em input não sanitizado"] }, { s: "Alto", n: 5, c: C.amber, items: ["Race condition no pagamento", "Timeout sem retry logic", "Memory leak no worker"] }, { s: "Médio", n: 8, c: C.orange, items: ["Cobertura insuficiente", "Logs sem correlation ID", "Docs desatualizados"] }, { s: "Baixo", n: 3, c: C.cyanL, items: ["Naming conventions", "Mix de idiomas em comentários"] }];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", gap: 10 }}>
                {[["bash", "🐛 Bug Bash", "Benchmark Cultural", C.amber], ["recall", "🔄 Recall", "→ Linha de Produção", C.emerald]].map(([id, l, sub, color]) => (
                    <button key={id} onClick={() => setTab(id)} style={{ all: "unset", cursor: "pointer", padding: "10px 20px", borderRadius: 10, background: tab === id ? `${color}20` : "rgba(255,255,255,0.04)", border: `2px solid ${tab === id ? color : C.slateL}`, transition: "all 0.2s" }}>
                        <div style={{ fontWeight: 800, fontSize: 14, color: tab === id ? color : "#fff" }}>{l}</div>
                        <div style={{ fontSize: 11, color: C.textD }}>{sub}</div>
                    </button>
                ))}
            </div>
            {tab === "bash" ? (
                <Card style={{ padding: 24 }} glow={C.amber}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <Bug size={22} color={C.amber} />
                        <div><div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>Relatório de Bug Bash</div><div style={{ fontSize: 11, color: C.textD }}>18 findings identificados no evento de adaptação cultural</div></div>
                        <div style={{ marginLeft: "auto" }}><Badge color={C.amber}>18 Findings</Badge></div>
                    </div>
                    {findings.map(f => (
                        <div key={f.s} style={{ marginBottom: 12, padding: "14px 16px", borderRadius: 12, background: `${f.c}0d`, border: `1px solid ${f.c}30` }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: f.c }} /><span style={{ fontWeight: 700, fontSize: 13, color: f.c }}>{f.s}</span></div>
                                <span style={{ fontSize: 12, color: C.textD }}>{f.n} findings</span>
                            </div>
                            {f.items.map(item => <div key={item} style={{ fontSize: 11, color: C.textD, paddingLeft: 16, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}><ArrowRight size={10} color={f.c} />{item}</div>)}
                        </div>
                    ))}
                </Card>
            ) : (
                <Card style={{ padding: 24 }} glow={C.emerald}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <RefreshCw size={22} color={C.emerald} />
                        <div><div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>Recall → Linha de Produção</div><div style={{ fontSize: 11, color: C.textD }}>Findings roteados de volta ao motor SWAIF para ajustes finos</div></div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
                        {[{ l: "Roteados p/ SPECIFY", n: 7, I: FileText, c: C.cyan, d: "Requisitos clarificados" }, { l: "Roteados p/ IMPLEMENT", n: 9, I: Code, c: C.orange, d: "Correções e refactoring" }, { l: "Resolvidos On-Site", n: 2, I: CheckCircle, c: C.emerald, d: "Hotfix imediato" }].map(item => (
                            <div key={item.l} style={{ padding: 16, borderRadius: 12, textAlign: "center", background: `${item.c}10`, border: `1px solid ${item.c}30` }}>
                                <item.I size={24} color={item.c} style={{ marginBottom: 8 }} />
                                <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{item.n}</div>
                                <div style={{ fontSize: 11, color: item.c, fontWeight: 600, marginBottom: 4 }}>{item.l}</div>
                                <div style={{ fontSize: 10, color: C.textD }}>{item.d}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: "12px 16px", borderRadius: 10, background: `${C.emerald}12`, border: `1px solid ${C.emerald}40`, display: "flex", alignItems: "center", gap: 10 }}>
                        <CheckCircle size={16} color={C.emerald} /><span style={{ fontSize: 13, color: C.emerald, fontWeight: 600 }}>Ciclo de Recall concluído. Qualidade validada. Pronto para Implantação.</span>
                    </div>
                </Card>
            )}
        </div>
    );
}

function Step5() {
    const metrics = [{ l: "Time-to-Market", b: "12 sem", a: "7 sem", d: "42% mais rápido", I: Clock, c: C.cyan }, { l: "Escape de Defeitos", b: "15%", a: "3%", d: "80% redução", I: Bug, c: C.red }, { l: "Cobertura de Testes", b: "45%", a: "92%", d: "+104%", I: FlaskConical, c: C.emerald }, { l: "Horas de Retrabalho", b: "45%", a: "12%", d: "73% redução", I: RefreshCw, c: C.amber }, { l: "Frequência de Deploy", b: "Mensal", a: "Diário", d: "30× mais", I: Rocket, c: C.orange }, { l: "Deploys com Falha", b: "18%", a: "2%", d: "89% redução", I: ShieldCheck, c: C.emerald }];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card style={{ padding: 24 }} glow={C.emerald}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.emerald, boxShadow: `0 0 10px ${C.emerald}`, animation: "pulse 2s infinite" }} />
                    <div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>Ambiente LIVE — Implantação Segura</div>
                    <div style={{ marginLeft: "auto" }}><Badge color={C.emerald}>PRODUÇÃO</Badge></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
                    {[{ I: Server, l: "Infraestrutura", v: "100% IaC", c: C.cyan }, { I: ShieldCheck, l: "Segurança", v: "Zero Findings", c: C.emerald }, { I: Activity, l: "Observabilidade", v: "Monitoring ✓", c: C.orange }].map(i => (
                        <div key={i.l} style={{ padding: 16, borderRadius: 12, textAlign: "center", background: `${i.c}10`, border: `1px solid ${i.c}30` }}>
                            <i.I size={22} color={i.c} style={{ marginBottom: 8 }} /><div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{i.v}</div><div style={{ fontSize: 11, color: C.textD }}>{i.l}</div>
                        </div>
                    ))}
                </div>
                <div style={{ fontSize: 10, color: C.textD, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>✅ Compliance Constitucional — Todos os 9 Artigos Aprovados</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {ARTS.map(a => (
                        <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 8, background: `${C.emerald}0d`, border: `1px solid ${C.emerald}25` }}>
                            <CheckCircle size={13} color={C.emerald} /><a.i size={13} color={a.c} /><span style={{ fontSize: 11, color: C.text }}>Art.{a.id} — {a.l}</span>
                        </div>
                    ))}
                </div>
            </Card>
            <Card style={{ padding: 24 }} glow={C.cyan}>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 20 }}>📊 ROI Comprovado — Dados Reais de Adoção</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
                    {metrics.map(m => (
                        <div key={m.l} style={{ padding: 16, borderRadius: 12, background: `${m.c}0d`, border: `1px solid ${m.c}30` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><m.I size={16} color={m.c} /><span style={{ fontSize: 11, color: C.textD, fontWeight: 600 }}>{m.l}</span></div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                                <div><div style={{ fontSize: 10, color: C.textD, marginBottom: 2 }}>Antes → Depois</div><div style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>{m.b} → <span style={{ color: m.c }}>{m.a}</span></div></div>
                                <div style={{ padding: "4px 10px", borderRadius: 999, background: `${m.c}20`, color: m.c, fontSize: 11, fontWeight: 800 }}>{m.d}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ padding: "20px 24px", borderRadius: 14, background: `linear-gradient(135deg,${C.navy3},${C.slateL})`, border: `1px solid ${C.orange}40`, textAlign: "center" }}>
                    <Rocket size={28} color={C.orange} style={{ marginBottom: 10 }} />
                    <div style={{ fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 6 }}>Pronto para transformar sua entrega de software?</div>
                    <div style={{ fontSize: 13, color: C.textD, marginBottom: 16 }}>30 dias grátis · Sem cartão de crédito · Cancele quando quiser</div>
                    <div style={{ display: "inline-block", padding: "12px 32px", borderRadius: 10, fontWeight: 800, fontSize: 14, background: `linear-gradient(135deg,${C.orange},${C.orangeL})`, color: "#fff", boxShadow: `0 4px 24px ${C.orange}50`, cursor: "pointer" }}>
                        Iniciar Trial Gratuito → innovai.swaif.local
                    </div>
                </div>
            </Card>
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}`}</style>
        </div>
    );
}

const STEPS = [{ id: 1, label: "Diagnóstico", icon: Search, sub: "Gargalos & Estratégia", C: Step1, color: C.red }, { id: 2, label: "Preparação", icon: FileCode, sub: "Input Técnico", C: Step2, color: C.orange }, { id: 3, label: "Execução SWAIF", icon: Cpu, sub: "Motor de Produção", C: Step3, color: C.cyan }, { id: 4, label: "Bug Bash & Recall", icon: Bug, sub: "Adaptação Cultural", C: Step4, color: C.amber }, { id: 5, label: "Implantação & ROI", icon: Rocket, sub: "Go-Live & ROI", C: Step5, color: C.emerald }];

export default function SWAIFDashboard() {
    const [active, setActive] = useState(1);
    const step = STEPS.find(s => s.id === active);
    const Comp = step.C;
    return (
        <div style={{ minHeight: "100vh", background: `radial-gradient(ellipse at 20% 10%,#1B2A5C55 0%,transparent 55%),radial-gradient(ellipse at 80% 90%,#E8910A18 0%,transparent 55%),${C.navy}`, fontFamily: "'Segoe UI',system-ui,sans-serif", color: C.text }}>
            <div style={{ padding: "14px 32px", borderBottom: `1px solid ${C.slateL}`, background: `${C.navy2}cc`, backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={InnovaiLogo} alt="INNOVAI" style={{ height: 42, width: "auto", objectFit: "contain", flexShrink: 0 }} />
                    <div>
                        <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "0.04em", color: "#fff", fontFamily: "'Courier New',monospace" }}>SWAIF</div>
                        <div style={{ fontSize: 9, color: C.orange, letterSpacing: "0.14em", fontWeight: 700, textTransform: "uppercase" }}>Powered by INNOVAI</div>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ fontSize: 12, color: C.textD }}><span style={{ color: C.cyan, fontWeight: 700 }}>9</span> Artigos &nbsp;·&nbsp; <span style={{ color: C.orange, fontWeight: 700 }}>6</span> Estágios &nbsp;·&nbsp; <span style={{ color: C.emerald, fontWeight: 700 }}>3</span> Modos</div>
                    <div style={{ padding: "5px 12px", borderRadius: 999, background: `${C.emerald}18`, border: `1px solid ${C.emerald}40`, fontSize: 11, color: C.emerald, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.emerald, animation: "pulse 2s infinite" }} />DEMO INTERATIVO
                    </div>
                </div>
            </div>
            <div style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 20px" }}>
                <div style={{ display: "flex", gap: 0, marginBottom: 28, borderRadius: 14, overflow: "hidden", border: `1px solid ${C.slateL}` }}>
                    {STEPS.map((s, i) => {
                        const act = active === s.id; const past = active > s.id; return (
                            <button key={s.id} onClick={() => setActive(s.id)} style={{ all: "unset", cursor: "pointer", flex: 1, padding: "14px 8px", textAlign: "center", background: act ? `${s.color}18` : past ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)", borderRight: i < 4 ? `1px solid ${C.slateL}` : "none", borderBottom: `3px solid ${act ? s.color : "transparent"}`, transition: "all 0.25s" }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                                    {past ? <CheckCircle size={17} color={C.emerald} /> : <s.icon size={17} color={act ? s.color : C.textD} />}
                                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.04em", color: act ? s.color : past ? C.emerald : C.textD, textTransform: "uppercase" }}>{s.id}. {s.label}</div>
                                    <div style={{ fontSize: 9, color: C.textD }}>{s.sub}</div>
                                </div>
                            </button>
                        );
                    })}
                </div>
                <div style={{ marginBottom: 22, display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 13, background: `${step.color}20`, border: `2px solid ${step.color}50`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 22px ${step.color}30` }}><step.icon size={22} color={step.color} /></div>
                    <div><div style={{ fontSize: 19, fontWeight: 800, color: "#fff" }}>Etapa {step.id}: {step.label}</div><div style={{ fontSize: 12, color: C.textD }}>{step.sub}</div></div>
                    <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                        {active > 1 && <button onClick={() => setActive(p => p - 1)} style={{ all: "unset", cursor: "pointer", padding: "8px 14px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: `1px solid ${C.slateL}`, fontSize: 12, color: C.textD }}>← Anterior</button>}
                        {active < 5 && <button onClick={() => setActive(p => p + 1)} style={{ all: "unset", cursor: "pointer", padding: "8px 14px", borderRadius: 8, background: `${step.color}20`, border: `1px solid ${step.color}50`, fontSize: 12, color: step.color, fontWeight: 700 }}>Próxima Etapa →</button>}
                    </div>
                </div>
                <Comp />
            </div>
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}} *{box-sizing:border-box} button:hover{filter:brightness(1.1)}`}</style>
        </div>
    );
}