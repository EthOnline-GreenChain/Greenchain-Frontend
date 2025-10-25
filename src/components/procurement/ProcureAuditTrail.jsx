"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Database,
  Clock,
  ShoppingCart,
  Link as LinkIcon,
  Copy,
  FileText,
  ClockMinute,
} from "lucide-react";

/**
 * ProcureAuditTrail
 * Props:
 *  - trade: the 'trade' object from your API (not the whole JSON wrapper)
 *
 * This component is intentionally self-contained and focuses on read-only display.
 * It uses Tailwind v4 classes consistent with other UI in your app.
 */


function formatNumber(v, digits = 2) {
  return Number(v).toLocaleString(undefined, { maximumFractionDigits: digits });
}

function tinyDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function copy(text) {
  navigator?.clipboard?.writeText(text).then(() => {
    // could show toast — but keep simple for now
  });
}

export default function ProcureAuditTrail({ trade }) {
  if (!trade) return null;

  const basket = trade?.basket ?? null;
  const holds = trade?.reservation_holds ?? [];
  const settlement = trade?.settlement ?? {};
  const retirements = trade?.retirements?.retirements ?? [];
  const proof = trade?.proof_bundle_hash ?? null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className="rounded-2xl border border-white/6 bg-[rgba(255,255,255,0.02)] p-6 space-y-6"
      aria-label={`Audit trail for order ${trade.order_id ?? ""}`}
    >
      {/* Header / summary */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-emerald-400" />
            Procure — {trade.order_id}
          </h3>

          <div className="mt-2 text-sm text-neutral-400">
            <div>
              <span className="font-medium text-neutral-300">Policy:</span>{" "}
              {trade.policy_name}
            </div>
            <div className="mt-1">
              <span className="font-medium text-neutral-300">Target:</span>{" "}
              <span className="font-semibold text-emerald-400">
                {formatNumber(trade.target_tco2e, 3)} tCO₂e
              </span>
            </div>
            <div className="mt-1 text-xs text-neutral-500">
              Run: {trade.run_id}
            </div>
          </div>
        </div>

        <div className="text-right space-y-1">
          <div className="text-sm text-neutral-400">Basket total</div>
          <div className="text-lg font-semibold text-white">
            {basket?.expected_total_pyusd != null
              ? `$${formatNumber(basket.expected_total_pyusd, 2)}`
              : "—"}
          </div>
          <div className="text-xs text-neutral-500">{basket?.policy_name}</div>
        </div>
      </div>

      {/* Basket lines */}
      <div className="rounded-lg border border-white/6 p-4 bg-[rgba(255,255,255,0.01)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-neutral-300">
            <Database className="w-4 h-4 text-emerald-400" />
            <div className="font-semibold">Basket</div>
            <div className="text-xs text-neutral-500 ml-2">({basket?.lines?.length ?? 0} lines)</div>
          </div>
          <div className="text-xs text-neutral-500">target {formatNumber(basket?.target_tco2e ?? 0,3)} tCO₂e</div>
        </div>

        <div className="mt-4 grid gap-3">
          {(basket?.lines ?? []).map((ln, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 rounded-md border border-white/6 p-3 hover:border-emerald-600 transition cursor-default"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-white truncate">{ln.credit_id}</div>
                  <div className="text-xs text-neutral-400">{ln.registry} • {ln.vintage}</div>
                </div>
                <div className="text-sm text-neutral-400 mt-1 truncate">{ln.project_id} • {ln.country}</div>
                <div className="text-xs text-neutral-500 mt-2">provider: {ln.provider_id.slice(0,14)}…</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-semibold text-emerald-400">{formatNumber(ln.tonnes,3)} t</div>
                  <div className="text-xs text-neutral-500">${formatNumber(ln.unit_price_pyusd,2)} / t</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-xs px-2 py-1 rounded-md bg-[rgba(16,185,129,0.06)] text-emerald-400 font-semibold">
                    {Math.round(ln.score * 100)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reservation holds */}
      <div className="rounded-lg border border-white/6 p-4 bg-[rgba(255,255,255,0.01)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-neutral-300">
            <Clock className="w-4 h-4 text-emerald-400" />
            <div className="font-semibold">Reservation holds</div>
          </div>
          <div className="text-xs text-neutral-500">{holds.length} holds</div>
        </div>

        <div className="mt-4 space-y-3">
          {holds.map((h, idx) => (
            <div key={h.hold_id || idx} className="flex items-center justify-between gap-3 p-3 rounded-md border border-white/6 hover:border-emerald-600 transition">
              <div className="min-w-0">
                <div className="text-sm text-white font-semibold">{h.credit_id}</div>
                <div className="text-xs text-neutral-400">provider {h.provider_id.slice(0,12)}…</div>
                <div className="text-xs text-neutral-500 mt-1">expires {tinyDate(h.expires_at)}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-semibold text-emerald-400">{formatNumber(h.tonnes,3)} t</div>
                  <div className="text-xs text-neutral-500">${formatNumber(h.unit_price,2)}</div>
                </div>
                <button
                  onClick={() => copy(h.hold_id)}
                  title="Copy hold id"
                  className="p-2 rounded-md border border-white/6 hover:bg-[rgba(16,185,129,0.06)] hover:border-emerald-600 transition cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-neutral-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settlement / transaction hashes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-lg border border-white/6 p-4 bg-[rgba(255,255,255,0.01)]">
          <div className="flex items-center gap-2 text-sm text-neutral-300">
            <FileText className="w-4 h-4 text-emerald-400" />
            <div className="font-semibold">Settlement (txs)</div>
          </div>

          <div className="mt-3 space-y-2">
            {(settlement?.tx_hashes ?? []).map((tx, i) => (
              <div key={tx + i} className="flex items-center justify-between gap-3 p-2 rounded-md border border-white/6 hover:border-emerald-600 transition">
                <div className="min-w-0 text-xs text-neutral-300 truncate">{tx}</div>
                <div className="flex items-center gap-2">
                  <a
                    className="text-xs text-neutral-400 hover:text-emerald-400 transition cursor-pointer"
                    href={`https://blockscout.com/tx/${tx}`}
                    target="_blank"
                    rel="noreferrer"
                    title="View on explorer"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => copy(tx)}
                    title="Copy tx hash"
                    className="p-2 rounded-md border border-white/6 hover:bg-[rgba(16,185,129,0.06)] hover:border-emerald-600 transition cursor-pointer"
                  >
                    <Copy className="w-4 h-4 text-neutral-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Retirements */}
        <div className="rounded-lg border border-white/6 p-4 bg-[rgba(255,255,255,0.01)]">
          <div className="flex items-center gap-2 text-sm text-neutral-300">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <div className="font-semibold">Retirements</div>
          </div>

          <div className="mt-3 space-y-2">
            {retirements.map((r, i) => (
              <div key={i} className="flex items-center justify-between gap-3 p-2 rounded-md border border-white/6 hover:border-emerald-600 transition">
                <div className="min-w-0">
                  <div className="text-sm text-white font-semibold">{r.credit_id}</div>
                  <div className="text-xs text-neutral-500">tonnes: {formatNumber(r.tonnes,3)}</div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://blockscout.com/tx/${r.tx_hash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-400 hover:text-emerald-400 transition cursor-pointer p-2 rounded-md border border-white/6 hover:bg-[rgba(16,185,129,0.06)]"
                    title="View tx"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => copy(r.proof_hash)}
                    title="Copy proof"
                    className="p-2 rounded-md border border-white/6 hover:bg-[rgba(16,185,129,0.06)] hover:border-emerald-600 transition cursor-pointer"
                  >
                    <Copy className="w-4 h-4 text-neutral-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Proof bundle */}
      {proof && (
        <div className="rounded-lg border border-white/6 p-4 bg-[rgba(255,255,255,0.01)] flex items-center justify-between">
          <div>
            <div className="text-sm text-neutral-300">Proof bundle</div>
            <div className="text-xs text-neutral-500 mt-1">Bundle hash (proof of retirement)</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-neutral-300 truncate max-w-[56ch]">{proof}</div>
            <button
              onClick={() => copy(proof)}
              title="Copy proof bundle"
              className="p-2 rounded-md border border-white/6 hover:bg-[rgba(16,185,129,0.06)] hover:border-emerald-600 transition cursor-pointer"
            >
              <Copy className="w-4 h-4 text-neutral-300" />
            </button>
          </div>
        </div>
      )}
    </motion.section>
  );
}
