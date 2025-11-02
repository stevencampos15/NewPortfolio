# Projects

Below are representative projects with clear context, actions, and outcomes. Headings and concise bullets are used to improve retrieval quality.

## Restoring Endpoint Visibility – Sophos Central

- Timeline: 2023  
- Tools: Sophos Central, Intune, NAC, Excel, Active Directory  
- Summary: Restored endpoint visibility for 200+ devices by correlating NAC/Intune/AD data, fixing blocked communications and agent issues—strengthening protection and compliance for an international bank.

### Context
While managing security for a bank with 5,000+ endpoints across multiple sites, several endpoints were not reporting to Sophos Central, meaning they missed updates and policy syncs.

### Investigation
- Correlated inventory across NAC, Intune, DLP, AD, and Sophos Central to build a cross-platform view.  
- Found devices present in other consoles but absent in Sophos Central.  
- Identified that NAC verified only software installation, not active communication, so disconnected endpoints weren’t quarantined.

### Root Cause
Sophos agents could not reach Sophos Central domains/internal update servers after network policy changes that restricted bandwidth and blocked traffic.

### Solution
- Mapped endpoint IPs to physical sites using network data to coordinate remediation.  
- Reinstalled and re-registered ~200 Sophos agents.  
- Optimized update configurations to reduce bandwidth usage.  
- Worked with the network team to restore required access for updates and policy synchronization.

### Outcome
Endpoint visibility was restored; updated security policies and filtering rules were enforced; misuse of corporate devices was identified. Security posture and bandwidth efficiency improved, and compliance was re‑established.

---

## Automation of Data Wiping and Policy Enforcement for Corporate Android Devices

- Timeline: 2023  
- Tools: VMware Workspace ONE (AirWatch), Android, MDM, Automation  
- Summary: Automated secure data deletion and enforced MDM policies for corporate Android devices—eliminating manual work, reducing data exposure risk, and improving visibility across all branches.

### Context
Corporate Android phones collected customer documents via WhatsApp Business. Sensitive files were deleted manually each day; no centralized mobile policies existed.

### Problem
Manual deletion was error‑prone and non‑scalable; devices lacked centralized control, visibility, and compliance monitoring.

### Solution
- Designed MDM profiles in VMware Workspace ONE.  
- Automated daily folder wipes to remove sensitive data.  
- Enrolled all devices and assigned clear ownership.  
- Implemented app restrictions and device health monitoring.  
- Configured automated remote wipe/lockout for compromised devices.

### Outcome
Sensitive data deletion became automatic; IT gained full visibility and control. Employees could use phones off‑site safely with tracking and enforced policies. Data exposure risk and operational overhead were significantly reduced.

---

## DGA Domain Incident Response and Containment

- Timeline: 2022  
- Tools: Sophos Central, ExtraHop, Zscaler ZIA, Threat Intelligence sources  
- Summary: Investigated and contained communications with a malicious DGA domain; isolated the endpoint, blocked IOCs, and improved threat detection practices.

### Context
ExtraHop raised an alert for suspicious DGA domain traffic inside the corporate network that required immediate investigation and containment.

### Actions
- Queried endpoints with Sophos Central Live Discover to hunt for indicators.  
- Identified one active connection to a confirmed malicious domain.  
- Isolated the endpoint to prevent lateral movement.  
- Executed live queries to analyze processes and data transfers; reviewed logs for exfiltration or spread.  
- Cross‑referenced IOCs with threat intel; applied blocks across Sophos and perimeter firewalls.

### Outcome
Uncovered excessive privileges and unauthorized tooling on the affected endpoint, leading to tighter access controls and application restrictions. Zscaler ZIA was rolled out to improve visibility/detection, and response workflows were strengthened.


