import unittest
from PIL import Image,ImageDraw
from build import pants,role,attachments,points
import json
from pathlib import Path

class PipelineTests(unittest.TestCase):
    def setUp(self):self.style=json.loads(Path(__file__).with_name('style.json').read_text())
    def test_rotated_leg_keeps_pants_and_boot(self):
        leg=Image.new('RGBA',(32,32));d=ImageDraw.Draw(leg);d.rectangle((13,7,16,22),fill='white');d.rectangle((13,22,20,24),fill='white')
        for turn,hip in [(0,(14,6)),(1,(6,17)),(2,(17,25)),(3,(25,14))]:
            im=leg.rotate(turn*90);out,cloth,stats=pants(im,hip,True,self.style)
            self.assertGreater(stats['covered_pixels'],0);self.assertGreater(stats['boot_pixels'],0)
            for y in range(32):
                for x in range(32):
                    if im.getpixel((x,y))[3]:self.assertEqual(out.getpixel((x,y))[3],255)
    def test_style_change_propagates_without_frame_edit(self):
        im=Image.new('RGBA',(24,24));ImageDraw.Draw(im).rectangle((7,2,14,21),fill='white')
        a=pants(im,(10,1),True,self.style)[1]
        self.style['palette']['pants']='#ff0000';b=pants(im,(10,1),True,self.style)[1]
        self.assertEqual(a.getchannel('A').tobytes(),b.getchannel('A').tobytes());self.assertNotEqual(a.tobytes(),b.tobytes())
    def test_semantic_cuff_is_independent_of_thigh_length(self):
        def leg(top):
            im=Image.new('RGBA',(32,32));d=ImageDraw.Draw(im)
            d.rectangle((12,top,15,14),fill=(209,204,96,255))
            d.rectangle((12,15,15,24),fill=(251,242,54,255))
            d.rectangle((12,24,19,26),fill=(251,242,54,255));return im
        first=pants(leg(3),(13,2),True,self.style)[1]
        second=pants(leg(9),(13,8),True,self.style)[1]
        self.assertEqual(first.crop((0,15,32,32)).tobytes(),second.crop((0,15,32,32)).tobytes())
    def test_pants_do_not_dilate_or_leave_source_holes(self):
        im=Image.new('RGBA',(32,32));d=ImageDraw.Draw(im)
        d.polygon([(12,4),(17,4),(22,13),(18,15),(12,9)],fill=(209,204,96,255))
        d.polygon([(18,13),(22,13),(17,23),(14,24),(13,22)],fill=(251,242,54,255))
        out,cloth,stats=pants(im,(14,3),True,self.style)
        self.assertEqual(points(out),points(im));self.assertTrue(points(cloth)<=points(im));self.assertTrue(stats['semantic_shin'])
    def test_head_tuck_does_not_move_robe_or_collar(self):
        head=Image.new('RGBA',(48,48));ImageDraw.Draw(head).ellipse((22,9,29,16),fill='white')
        torso=Image.new('RGBA',(48,48));ImageDraw.Draw(torso).rectangle((21,17,28,25),fill='white')
        parts={'head':head,'torso':torso}
        a=attachments(parts,self.style,{},2.1)[0]
        b=attachments(parts,self.style,{'head_down':[-1,0],'face':'tucked'},2.1)[0]
        self.assertEqual(a['robe'].tobytes(),b['robe'].tobytes())
        self.assertEqual(a['collar'].tobytes(),b['collar'].tobytes())
        self.assertNotEqual(a['hood'].tobytes(),b['hood'].tobytes())
    def test_half_pixel_head_centers_do_not_change_eye_shape(self):
        def hood(right):
            head=Image.new('RGBA',(48,48));ImageDraw.Draw(head).rectangle((22,9,right,16),fill='white')
            torso=Image.new('RGBA',(48,48));ImageDraw.Draw(torso).rectangle((21,17,28,25),fill='white')
            h=attachments({'head':head,'torso':torso},self.style,{'head_down':[0,1]},2.1)[0]['hood']
            return h.crop(h.getbbox())
        self.assertEqual(hood(29).tobytes(),hood(30).tobytes())
    def test_aliases_and_unsupported_layers(self):
        self.assertEqual(role('Back leg'),'back_leg');self.assertEqual(role('Lead Leg'),'front_leg')
        self.assertEqual(role('Front Hand'),'front_arm');self.assertIsNone(role('Flattened'))

if __name__=='__main__':unittest.main()
