/**
 * Cloud & Engineering Shape Registry
 * Each shape has: id, label, provider, category, icon (SVG JSX), default colours
 */
import React from 'react';

export type CloudProvider = 'AWS' | 'Azure' | 'GCP' | 'K8s' | 'Generic';

export interface CloudShapeDef {
  id: string;
  label: string;
  provider: CloudProvider;
  category: string;
  defaultFill: string;
  defaultStroke: string;
  defaultW: number;
  defaultH: number;
  Icon: React.FC<{ width?: number; height?: number; fill?: string; stroke?: string }>;
}

/* ─── Colour tokens per provider ─────────────────────────────────────── */
const C = {
  aws:     { fill: '#FF9900', bg: '#FFF3E0', border: '#F57C00', text: '#232F3E' },
  azure:   { fill: '#0078D4', bg: '#E3F2FD', border: '#1565C0', text: '#00396B' },
  gcp:     { fill: '#4285F4', bg: '#E8F0FE', border: '#1A73E8', text: '#174EA6' },
  k8s:     { fill: '#326CE5', bg: '#EFF3FE', border: '#1A44C2', text: '#1A2E6B' },
  generic: { fill: '#607D8B', bg: '#ECEFF1', border: '#455A64', text: '#263238' },
};

/* ─── SVG helpers ────────────────────────────────────────────────────── */
function BaseIcon({ children, vb = '0 0 64 64', w = 48, h = 48 }: {
  children: React.ReactNode; vb?: string; w?: number; h?: number;
}) {
  return <svg width={w} height={h} viewBox={vb} fill="none" xmlns="http://www.w3.org/2000/svg">{children}</svg>;
}

/* ══════════════════════════════════════════════════════════════
   AWS SHAPES
══════════════════════════════════════════════════════════════ */
const AwsEC2Icon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#FF9900" opacity="0.15"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#FF9900" strokeWidth="2.5" fill="none"/>
    {/* Server stack */}
    <rect x="12" y="16" width="40" height="10" rx="2" fill="#FF9900"/>
    <rect x="12" y="30" width="40" height="10" rx="2" fill="#FF9900" opacity="0.7"/>
    <rect x="12" y="44" width="40" height="4" rx="2" fill="#FF9900" opacity="0.4"/>
    <circle cx="46" cy="21" r="2.5" fill="white"/>
    <circle cx="46" cy="35" r="2.5" fill="white"/>
  </BaseIcon>
);

const AwsS3Icon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#3F8624" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#3F8624" strokeWidth="2.5" fill="none"/>
    {/* Bucket shape */}
    <ellipse cx="32" cy="18" rx="18" ry="6" fill="#3F8624"/>
    <path d="M14 18 Q14 50 32 52 Q50 50 50 18" fill="#3F8624" opacity="0.5"/>
    <ellipse cx="32" cy="18" rx="18" ry="6" fill="#3F8624" opacity="0.8"/>
  </BaseIcon>
);

const AwsRDSIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#527FFF" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#527FFF" strokeWidth="2.5" fill="none"/>
    {/* DB cylinder */}
    <ellipse cx="32" cy="20" rx="16" ry="6" fill="#527FFF"/>
    <rect x="16" y="20" width="32" height="22" fill="#527FFF" opacity="0.5"/>
    <ellipse cx="32" cy="42" rx="16" ry="6" fill="#527FFF" opacity="0.8"/>
    <ellipse cx="32" cy="20" rx="16" ry="6" fill="#527FFF"/>
  </BaseIcon>
);

const AwsLambdaIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#FF9900" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#FF9900" strokeWidth="2.5" fill="none"/>
    <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle"
      fontSize="28" fontWeight="bold" fill="#FF9900" fontFamily="monospace">λ</text>
  </BaseIcon>
);

const AwsAPIGWIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#A166FF" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#A166FF" strokeWidth="2.5" fill="none"/>
    <path d="M10 32 L22 20 L38 20 L50 32 L38 44 L22 44 Z" stroke="#A166FF" strokeWidth="2" fill="#A166FF" fillOpacity="0.2"/>
    <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle"
      fontSize="10" fontWeight="700" fill="#A166FF" fontFamily="monospace">API</text>
  </BaseIcon>
);

const AwsCloudFrontIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#FF9900" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#FF9900" strokeWidth="2.5" fill="none"/>
    <circle cx="32" cy="32" r="16" stroke="#FF9900" strokeWidth="2" fill="none"/>
    <ellipse cx="32" cy="32" rx="8" ry="16" stroke="#FF9900" strokeWidth="2" fill="none"/>
    <line x1="16" y1="32" x2="48" y2="32" stroke="#FF9900" strokeWidth="2"/>
  </BaseIcon>
);

const AwsSQSIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#FF4F8B" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#FF4F8B" strokeWidth="2.5" fill="none"/>
    <rect x="10" y="20" width="44" height="24" rx="4" stroke="#FF4F8B" strokeWidth="2" fill="#FF4F8B" fillOpacity="0.15"/>
    {/* Queue dots */}
    {[16, 26, 36, 46].map((x) => (
      <circle key={x} cx={x} cy="32" r="3" fill="#FF4F8B"/>
    ))}
  </BaseIcon>
);

const AwsELBIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#FF9900" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#FF9900" strokeWidth="2.5" fill="none"/>
    <rect x="10" y="26" width="20" height="12" rx="2" fill="#FF9900" opacity="0.7"/>
    <line x1="30" y1="32" x2="38" y2="22" stroke="#FF9900" strokeWidth="2"/>
    <line x1="30" y1="32" x2="38" y2="32" stroke="#FF9900" strokeWidth="2"/>
    <line x1="30" y1="32" x2="38" y2="42" stroke="#FF9900" strokeWidth="2"/>
    {[22, 32, 42].map((y) => <rect key={y} x="38" y={y - 4} width="12" height="8" rx="2" fill="#FF9900" opacity="0.5"/>)}
  </BaseIcon>
);

/* ══════════════════════════════════════════════════════════════
   AZURE SHAPES
══════════════════════════════════════════════════════════════ */
const AzureVMIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#0078D4" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#0078D4" strokeWidth="2.5" fill="none"/>
    <rect x="10" y="14" width="44" height="30" rx="3" fill="#0078D4" opacity="0.2" stroke="#0078D4" strokeWidth="1.5"/>
    <rect x="16" y="20" width="14" height="10" rx="2" fill="#0078D4"/>
    <rect x="34" y="20" width="14" height="10" rx="2" fill="#0078D4" opacity="0.6"/>
    <rect x="18" y="46" width="28" height="4" rx="2" fill="#0078D4" opacity="0.4"/>
  </BaseIcon>
);

const AzureBlobIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#0078D4" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#0078D4" strokeWidth="2.5" fill="none"/>
    <path d="M32 14 C20 14 12 20 12 28 C12 36 20 42 32 42 C44 42 52 36 52 28 C52 20 44 14 32 14Z" fill="#0078D4" opacity="0.3" stroke="#0078D4" strokeWidth="1.5"/>
    <circle cx="32" cy="28" r="8" fill="#0078D4"/>
  </BaseIcon>
);

const AzureSQLIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#0078D4" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#0078D4" strokeWidth="2.5" fill="none"/>
    <ellipse cx="32" cy="18" rx="18" ry="7" fill="#0078D4"/>
    <rect x="14" y="18" width="36" height="22" fill="#0078D4" opacity="0.4"/>
    <ellipse cx="32" cy="40" rx="18" ry="7" fill="#0078D4" opacity="0.7"/>
    <ellipse cx="32" cy="18" rx="18" ry="7" fill="#0078D4"/>
  </BaseIcon>
);

const AzureFuncIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#0062AD" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#0062AD" strokeWidth="2.5" fill="none"/>
    <path d="M20 44 L28 20 L36 32 L40 24" stroke="#0062AD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="40" cy="24" r="4" fill="#0062AD"/>
  </BaseIcon>
);

/* ══════════════════════════════════════════════════════════════
   GCP SHAPES
══════════════════════════════════════════════════════════════ */
const GcpGCEIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#4285F4" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#4285F4" strokeWidth="2.5" fill="none"/>
    <rect x="14" y="14" width="36" height="36" rx="4" fill="#4285F4" opacity="0.2" stroke="#4285F4" strokeWidth="1.5"/>
    <circle cx="32" cy="32" r="10" fill="#4285F4"/>
    <circle cx="32" cy="32" r="4" fill="white"/>
  </BaseIcon>
);

const GcpGCSIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#FBBC04" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#FBBC04" strokeWidth="2.5" fill="none"/>
    <path d="M16 22 L32 12 L48 22 L48 44 L32 52 L16 44 Z" fill="#FBBC04" opacity="0.3" stroke="#FBBC04" strokeWidth="1.5"/>
    <circle cx="32" cy="32" r="8" fill="#FBBC04"/>
  </BaseIcon>
);

const GcpBQIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#34A853" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#34A853" strokeWidth="2.5" fill="none"/>
    <circle cx="32" cy="28" r="14" stroke="#34A853" strokeWidth="2.5" fill="#34A853" fillOpacity="0.15"/>
    <line x1="42" y1="38" x2="52" y2="48" stroke="#34A853" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="32" cy="28" r="6" fill="#34A853"/>
  </BaseIcon>
);

const GcpPubSubIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#EA4335" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#EA4335" strokeWidth="2.5" fill="none"/>
    <circle cx="18" cy="32" r="6" fill="#EA4335"/>
    <circle cx="46" cy="20" r="6" fill="#EA4335" opacity="0.7"/>
    <circle cx="46" cy="44" r="6" fill="#EA4335" opacity="0.7"/>
    <line x1="24" y1="29" x2="40" y2="22" stroke="#EA4335" strokeWidth="2"/>
    <line x1="24" y1="35" x2="40" y2="42" stroke="#EA4335" strokeWidth="2"/>
  </BaseIcon>
);

/* ══════════════════════════════════════════════════════════════
   KUBERNETES SHAPES
══════════════════════════════════════════════════════════════ */
const K8sPodIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#326CE5" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#326CE5" strokeWidth="2.5" fill="none"/>
    {/* K8s hexagon */}
    <polygon points="32,10 50,20 50,44 32,54 14,44 14,20" fill="#326CE5" fillOpacity="0.2" stroke="#326CE5" strokeWidth="2"/>
    <circle cx="32" cy="32" r="8" fill="#326CE5"/>
    {[0,60,120,180,240,300].map((deg) => {
      const r = 18;
      const x = 32 + r * Math.cos(deg * Math.PI / 180);
      const y = 32 + r * Math.sin(deg * Math.PI / 180);
      return <circle key={deg} cx={x} cy={y} r="3" fill="#326CE5" opacity="0.6"/>;
    })}
  </BaseIcon>
);

const K8sServiceIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#326CE5" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#326CE5" strokeWidth="2.5" fill="none"/>
    <rect x="14" y="14" width="36" height="36" rx="18" fill="none" stroke="#326CE5" strokeWidth="2"/>
    <line x1="14" y1="32" x2="50" y2="32" stroke="#326CE5" strokeWidth="2"/>
    <line x1="32" y1="14" x2="32" y2="50" stroke="#326CE5" strokeWidth="2"/>
    <circle cx="32" cy="32" r="6" fill="#326CE5"/>
  </BaseIcon>
);

const K8sDeployIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#326CE5" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#326CE5" strokeWidth="2.5" fill="none"/>
    {[[10,10,20,16],[34,10,20,16],[10,38,20,16],[34,38,20,16]].map(([x,y,w,h], i) => (
      <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="#326CE5" opacity={i < 2 ? 0.9 : 0.5}/>
    ))}
    <rect x="22" y="28" width="20" height="8" rx="2" fill="#326CE5"/>
  </BaseIcon>
);

const K8sIngressIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#326CE5" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#326CE5" strokeWidth="2.5" fill="none"/>
    <path d="M10 32 L30 32 M30 24 L50 32 L30 40 L30 24" fill="#326CE5" fillOpacity="0.3" stroke="#326CE5" strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="10" cy="32" r="5" fill="#326CE5"/>
  </BaseIcon>
);

const K8sConfigMapIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#326CE5" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#326CE5" strokeWidth="2.5" fill="none"/>
    <rect x="12" y="14" width="40" height="36" rx="4" fill="#326CE5" fillOpacity="0.15" stroke="#326CE5" strokeWidth="1.5"/>
    {[22, 30, 38].map((y) => <line key={y} x1="18" y1={y} x2="46" y2={y} stroke="#326CE5" strokeWidth="2"/>)}
  </BaseIcon>
);

/* ══════════════════════════════════════════════════════════════
   GENERIC SHAPES
══════════════════════════════════════════════════════════════ */
const GenericServerIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#607D8B" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#607D8B" strokeWidth="2.5" fill="none"/>
    {[14, 26, 38].map((y) => (
      <g key={y}>
        <rect x="10" y={y} width="44" height="10" rx="2" fill="#607D8B" opacity="0.3" stroke="#607D8B" strokeWidth="1"/>
        <circle cx="47" cy={y + 5} r="2.5" fill="#34C759"/>
      </g>
    ))}
  </BaseIcon>
);

const GenericDBIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#607D8B" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#607D8B" strokeWidth="2.5" fill="none"/>
    <ellipse cx="32" cy="16" rx="18" ry="7" fill="#607D8B"/>
    <rect x="14" y="16" width="36" height="26" fill="#607D8B" opacity="0.35"/>
    <ellipse cx="32" cy="42" rx="18" ry="7" fill="#607D8B" opacity="0.7"/>
    <ellipse cx="32" cy="16" rx="18" ry="7" fill="#607D8B"/>
  </BaseIcon>
);

const GenericQueueIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#607D8B" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#607D8B" strokeWidth="2.5" fill="none"/>
    {[16, 28, 40].map((y, i) => (
      <rect key={y} x="10" y={y} width={44 - i * 8} height="8" rx="2" fill="#607D8B" opacity={1 - i * 0.25}/>
    ))}
  </BaseIcon>
);

const GenericClientIcon: CloudShapeDef['Icon'] = ({ width = 48, height = 48 }) => (
  <BaseIcon w={width} h={height}>
    <rect x="4" y="4" width="56" height="56" rx="6" fill="#607D8B" opacity="0.12"/>
    <rect x="4" y="4" width="56" height="56" rx="6" stroke="#607D8B" strokeWidth="2.5" fill="none"/>
    <rect x="12" y="14" width="40" height="28" rx="3" fill="#607D8B" opacity="0.3" stroke="#607D8B" strokeWidth="1.5"/>
    <rect x="24" y="44" width="16" height="4" rx="2" fill="#607D8B" opacity="0.5"/>
    <rect x="18" y="48" width="28" height="2" rx="1" fill="#607D8B" opacity="0.3"/>
  </BaseIcon>
);
