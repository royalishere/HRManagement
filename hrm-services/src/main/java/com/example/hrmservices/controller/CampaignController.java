package com.example.hrmservices.controller;

import com.example.hrmservices.model.Campaign;
import com.example.hrmservices.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5000")
@RequestMapping("/api/campaigns")
public class CampaignController {
    @Autowired
    private CampaignService campaignService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Campaign createCampaign(@RequestBody Campaign campaign) {
        return campaignService.createCampaign(campaign);
    }

    @GetMapping
    public List<Campaign> getAllCampaigns() {
        return campaignService.getAllCampaigns();
    }

    @GetMapping("/visible")
    public List<Campaign> getVisibleCampaigns() {
        return campaignService.getVisibleCampaigns();
    }

    @GetMapping("/ongoing")
    public List<Campaign> getOngoingCampaigns() {
        return campaignService.getOngoingCampaigns();
    }

    @GetMapping("/{id}")
    public Campaign getCampaignById(@PathVariable String id) {
        return campaignService.getCampaignById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found with id: " + id));
    }

    @PutMapping("/{id}")
    public Campaign updateCampaign(@PathVariable String id, @RequestBody Campaign campaignDetails) {
        return campaignService.updateCampaign(id, campaignDetails);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCampaign(@PathVariable String id) {
        campaignService.deleteCampaign(id);
    }
}
